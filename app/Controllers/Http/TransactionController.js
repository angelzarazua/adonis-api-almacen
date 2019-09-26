'use strict'
const Transaction = use('App/Models/Transaction');
const Sale = use('App/Models/Sale');


class TransactionController {
    async index({ request, response }) {
        let transaction = await Transaction.query().fetch();
        return response.json(transaction);
    }

    async store({ request, response }) {
        console.log(request.all())
        let transaction = Transaction.create(request.all())
        return response.json(transaction);
    }

    async show({ params, request, response, view }) {
        console.log(params)
        let {id} = params
        let transaction = await Transaction.find(id)
        return response.json(transaction)
    }

    async update({ params, request, response }) {
        let data = request.all()
        let {id} = params
        let transaction = await Transaction.find(id)
        if (!transaction) {
            return response.status(404).json({data: 'No existe'})
        }
        transaction.merge(data)
        transaction.save(data)
        console.log(id,data)
        return response.json(transaction)
    }
    async destroy({ params, request, response }) {
        let {id} = params
        let transaction = await Transaction.find(id)
        if (!transaction) {
          return response.status(404).json({data: 'No existe'})
        }
        await transaction.delete()
        /* return response.status(200).json('Eliminado') */
    }
}

module.exports = TransactionController
