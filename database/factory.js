'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
  return {
    username: 'admin',//faker.username(),
    email: 'admin@hotmail.com',//faker.email(),
    password: '1234678',
    rol: '1'
  }
})


Factory.blueprint('App/Models/Product', (faker) => {
    return {
      code: faker.year(),
      name: 'Takis',//faker.name(),
      description: 'Takis en presentación de 450g',//faker.paragraph(),
      //image: 'http//1270.0.0.1:333/image/'+ faker.title + '.jpg'
      image: faker.avatar({protocol: 'https'})
    }
  })

  Factory.blueprint('App/Models/Inventory', (faker) => {
    return {
      product_id:'1',
      quantity: '30',
      price: '8',
      user_id: '1',
      tax: '16'
    }
  })