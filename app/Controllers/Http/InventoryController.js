'use strict'
const Inventory = use('App/Models/Inventory');
const Transaction = use('App/Models/Transaction');


class InventoryController {
    async index({ request, response }) {
        let inventory = await Inventory.query().fetch();
        return response.json(inventory);
    }

    async store({ request, response }) {
        console.log(request.all())
        Inventory.create(request.all())
        return response.json(request.all());
    }

    async show({ params, request, response, view }) {
        console.log(params)
        let {id} = params
        let inventory = await Inventory.find(id)
        return response.json(inventory)
    }

    async update({ params, request, response }) {
        let data = request.all()
        let {id} = params
        let inventory = await Inventory.find(id)
        let cantidadFinal

        if (!inventory) {
            return response.status(404).json({data: 'No existe'})
        }

        if (data.quantity == 0 && inventory.quantity == 0) {
            return response.status(404).json({data: 'El producto ya se ha dado de baja'})
        }

        if (data.quantity == 0) {
            console.log('Remove');
            cantidadFinal = 0
            inventory.quantity = 0
        }else{
            inventory.quantity = inventory.quantity + data.quantity
            cantidadFinal = inventory.quantity
        }

        if (data.price == null) {
            console.log('Es nulo!');
        }else{
            inventory.price = data.price
        }

        if (data.tax == null) {
            console.log('Es nulo!');
        }else{
            inventory.tax = data.tax
        }

        let transaction = await Transaction.create({
                inventory_id: inventory.id,
                type: 3,
                quantity: cantidadFinal,
                description: "Se ha dado de baja al producto"
            })

        //inventory.merge(inventory)
        inventory.save(inventory)
        await transaction.save()
        return response.json(inventory)
    }

    async destroy({ params, request, response }) {
        let {id} = params
        let inventory = await Inventory.find(id)
        if (!inventory) {
          return response.status(404).json({data: 'No existe'})
        }
        await inventory.delete()
        /* return response.status(200).json('Eliminado') */
    }
}

module.exports = InventoryController
