'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SaleSchema extends Schema {
  up () {
    this.create('sales', (table) => {
      table.increments('id')
      table.integer('product_id').unsigned().notNullable()
      table.foreign('product_id').references('id').inTable('products')
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('id').inTable('users')
      table.integer('quantity').notNullable()
      table.float('discount').notNullable()
      table.float('total').notNullable()
      table.timestamp('date').notNullable()
      table.integer('paymenth_method ').notNullable()
      table.boolean('status').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('sales')
  }
}

module.exports = SaleSchema
