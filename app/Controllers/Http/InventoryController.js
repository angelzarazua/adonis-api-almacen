'use strict'
const Inventory = use('App/Models/Inventory');

class InventoryController {
    async index({ request, response }) {
        let inventory = await Inventory.query().fetch();
        return response.json(inventory);
    }

    async store({ request, response }) {
        console.log(request.all())
        let inventory = Inventory.create(request.all())
        return response.json(inventory);
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
        if (!inventory) {
            return response.status(404).json({data: 'No existe'})
        }
        inventory.merge(data)
        inventory.save(data)
        console.log(id,data)
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
