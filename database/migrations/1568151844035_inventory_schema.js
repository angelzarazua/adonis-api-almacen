'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InventorySchema extends Schema {
  up () {
    this.create('inventories', (table) => {
      table.increments('id')

      table.integer('product_id').unsigned().notNullable()
      table.foreign('product_id').references('id').inTable('products')
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('id').inTable('users')

      table.integer('quantity').notNullable()
      table.float('price').notNullable()
      table.float('tax').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('inventories')
  }
}

module.exports = InventorySchema
