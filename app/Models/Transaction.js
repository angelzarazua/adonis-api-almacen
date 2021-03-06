'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Transaction extends Model {
    inventories(){
        return this.belongsTo('App/Models/Inventory')
    }
}

module.exports = Transaction
