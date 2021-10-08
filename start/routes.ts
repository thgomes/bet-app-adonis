import Database from '@ioc:Adonis/Lucid/Database'
import Route from '@ioc:Adonis/Core/Route'

// Public Routes
Route.group(() => {
  Route.get('/', async () => {
    return Database.from('users').select('*')
  })

  Route.post('login', 'AuthController.login')
  Route.post('users', 'UsersController.store')
  Route.post('password', 'ForgotPasswordController.store')
  Route.put('password', 'ForgotPasswordController.update')
})

// User Routes
Route.group(() => {
  Route.get('users', 'UsersController.index')
  Route.get('users/:id', 'UsersController.show')
  Route.put('users/:id', 'UsersController.update')
  Route.resource('bets', 'BetsController').apiOnly()
}).middleware(['auth'])

// Admin Routes
Route.group(() => {
  Route.resource('games', 'GamesController').apiOnly()
  Route.delete('users/:id', 'UsersController.destroy')
}).middleware(['auth', 'admin'])
