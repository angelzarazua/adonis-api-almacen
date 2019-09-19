'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    inventories(){
        return this.hasMany('App/Models/Inventory')
    }

    sales(){
        return this.hasMany('App/Models/Sale')
    }

    // user(){
    //     return this.hasMany('App/Models/User')
    // }
}

module.exports = Product
