'use strict'
const Sale = use('App/Models/Sale');
const Transaction = use('App/Models/Transaction');
const Inventory = use('App/Models/Inventory');


class SaleController {
    async index({ request, response }) {
        let sale = await Sale.query().fetch();
        console.log("salee", sale);
        return response.json(sale);
    }

    async store({ request, response }) {
        console.log(request.all())
        request = request.all()
        /*1. Efectivo
        2. Tarjeta de débito
        4. Tarjeta de crédito
        5. Cheque

        Status
        1. succes
        2. cancel */
        console.log('before');
        let sale = {
            product_id : request.product_id,
            user_id : request.user_id,
            quantity : request.quantity,
            discount : request.discount,
            paymenth_method : request.paymenth_method,
            status: request.status,
        }

        let producto = await Inventory.findBy('product_id', sale.product_id)
        let precio = producto.price
        let iva = producto.tax/100
        let descuento = sale.discount
        let total = precio*sale.quantity

        if (descuento<1) {
            console.log('es porcentaje');
            descuento = total*sale.discount
            total = total-descuento
            console.log('Total: ', se.total);
        }else{
            console.log('Es entero');
            total = total-descuento
            console.log('Total: ', total);
        }

        total = total + (total*iva)
        console.log('Total de todo: ', total);
        let date = new Date();
        //console.log('Fecha y hora: ', today);

        sale = await Sale.create({
            product_id : request.product_id,
            user_id : request.user_id,
            quantity : request.quantity,
            discount : request.discount,
            total: total,
            date: date,
            paymenth_method : request.paymenth_method,
            status: request.status,
          })

        let inventario = producto.quantity
        producto.quantity = inventario - request.quantity
        //console.log('producto: ', producto.quantity);
        if (producto.quantity<0) {
            console.log('Negativo');
            return response.json({data:'Error, el número de productos pedidos sobre pasa el limite en stack'})
        }else{
            let transaction = await Transaction.create({
                inventory_id: producto.id,
                type: 2,
                quantity: sale.quantity,
                description: "Se ha vendido un producto"
            })
            //console.log('transaction: ', transaction);
            await producto.save()
            await sale.save()
            await transaction.save()
            return response.status(201).json(sale);
        }



        //let sale = Sale.create(request.all())
    }

    async show({ params, request, response, view }) {
        console.log(params)
        let {id} = params
        let sale = await Sale.find(id)
        return response.json(sale)
    }

    async update({ params, request, response }) {
        let data = request.all()
        let {id} = params
        let sale = await Sale.find(id)
        if (!sale) {
            return response.status(404).json({data: 'No existe'})
        }
        if (sale.status == false) {
            return response.status(404).json({data: 'La venta ya ha sido cancelada!'})
        }

        let productoInventario = await Inventory.findBy('product_id', sale.product_id)
        let transaction = await Transaction.create({
            inventory_id: productoInventario.id,
            type: 1,
            quantity: sale.quantity,
            description: "El pedido se ha cancelado"
        })

        let stackNow = productoInventario.quantity
        productoInventario.quantity = stackNow + sale.quantity
        sale.status = false

        //sale.merge(sale)
        sale.save(sale)
        productoInventario.save(productoInventario)
        await transaction.save()
        //console.log(id,data)
        return response.json(sale)
    }
}

module.exports = SaleController
