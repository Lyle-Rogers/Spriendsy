'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('navigation')
Route.on('/forum').render('pages/forum')
Route.on('/friends').render('pages/friends')
Route.on('/archive').render('pages/archive')
Route.on('/profile-settings').render('pages/profile-settings')

Route.on('/login').render('auth/login')

Route.on('/register').render('auth/register')
Route.post('/register', 'UserController.create')