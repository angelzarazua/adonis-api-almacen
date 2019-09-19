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
    username: faker.username(),
    email: faker.email(),
    password: '1234678',
    rol: '0'
  }
})


Factory.blueprint('App/Models/Product', (faker) => {
    return {
      code: faker.year(),
      name: faker.name(),
      description: faker.paragraph(),
      //image: 'http//1270.0.0.1:333/image/'+ faker.title + '.jpg'
      image: faker.avatar({protocol: 'https'})
    }
  })