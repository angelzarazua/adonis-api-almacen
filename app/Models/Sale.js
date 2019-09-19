'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sale extends Model {
    users(){
        return this.belongsTo('App/Models/User')
    }

    products(){
        return this.belongsTo('App/Models/Product')
    }
}

module.exports = Sale
