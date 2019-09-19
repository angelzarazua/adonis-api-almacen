'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments('id')
      table.integer('code').notNullable().unique()
      table.string('name',150).notNullable().unique()
      table.text('description', 'longText').notNullable()
      table.string('image', 150).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
