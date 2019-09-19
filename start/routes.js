'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const User = use('App/Models/User')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
// Route.group((){
//   Route.get('users', 'UserController').apiOnly()
// })

Route.get('/users','UserController.index')
Route.get('/users/:id','UserController.show')
Route.post('/users','UserController.store')
Route.put('/users/:id','UserController.update')
Route.delete('/users/:id','UserController.destroy')

Route.get('/products','ProductController.index')
Route.get('/products/:id','ProductController.show')
Route.post('/products','ProductController.store')
Route.put('/products/:id','ProductController.update')
Route.delete('/products/:id','ProductController.destroy')


Route.get('/inventories','InventoryController.index')
Route.get('/inventories/:id','InventoryController.show')
Route.post('/inventories','InventoryController.store')
Route.put('/inventories/:id','InventoryController.update')
Route.delete('/inventories/:id','InventoryController.destroy')

Route.get('/transactions','TransactionController.index')
Route.get('/transactions/:id','TransactionController.show')
Route.post('/transactions','TransactionController.store')
Route.put('/transactions/:id','TransactionController.update')
Route.delete('/transactions/:id','TransactionController.destroy')


Route.get('/sales','SaleController.index')
Route.get('/sales/:id','SaleController.show')
Route.post('/sales','SaleController.store')
Route.put('/sales/:id','SaleController.update')
Route.delete('/sales/:id','SaleController.destroy')