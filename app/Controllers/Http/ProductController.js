'use strict'
const Product = use('App/Models/Product');

class ProductController {
    async index({ request, response }) {
        let product = await Product.query().fetch();
        return response.json(product);
    }

    async store({ request, response }) {
        console.log(request.all())
        let product = Product.create(request.all())
        return response.json(product);
    }

    async show({ params, request, response, view }) {
        console.log(params)
        let {id} = params
        let product = await Product.find(id)
        return response.json(product)
    }

    async update({ params, request, response }) {
        let data = request.all()
        let {id} = params
        let product = await Product.find(id)
        if (!product) {
            return response.status(404).json({data: 'No existe'})
        }
        product.merge(data)
        product.save(data)
        console.log(id,data)
        return response.json(product)
    }
    async destroy({ params, request, response }) {
        let {id} = params
        let product = await Product.find(id)
        if (!product) {
          return response.status(404).json({data: 'No existe'})
        }
        await product.delete()
        /* return response.status(200).json('Eliminado') */
    }
}

module.exports = ProductController
