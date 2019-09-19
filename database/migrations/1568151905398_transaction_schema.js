'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionSchema extends Schema {
  up () {
    this.create('transactions', (table) => {
      table.increments('id')
      table.integer('inventory_id').unsigned().notNullable()
      table.foreign('inventory_id').references('id').inTable('inventories')
      table.integer('type').notNullable()
      table.integer('quantity').notNullable()
      table.text('description', 'longText').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('transactions')
  }
}

module.exports = TransactionSchema
