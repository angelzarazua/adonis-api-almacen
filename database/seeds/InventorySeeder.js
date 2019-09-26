'use strict'

/*
|--------------------------------------------------------------------------
| InventorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class InventorySeeder {
  async run () {
    await Factory.model('App/Models/Inventory').create()

  }
}

module.exports = InventorySeeder
