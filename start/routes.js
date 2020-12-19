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

Route.on('/archive').render('pages/archive')
Route.on('/profile-settings').render('pages/profile-settings')

Route.on('/login').render('auth/login')
Route.post('/login', 'UserController.login').validator('Login')

Route.on('/register').render('auth/register')
Route.post('/register', 'UserController.create').validator('Register')

Route.get('/logout', async ({ auth, response }) => {
  await auth.logout();
  return response.redirect('/login');
})

Route.get('/forum', 'ForumMessagingController.messagesLoader')
Route.post('/forum', 'ForumMessagingController.sendMessage')
Route.get('/forum/forum_delete/:id', 'ForumMessagingController.deleteForumMessage')
Route.get('/forum/forum_edit/:id', 'ForumMessagingController.editForumMessage')
Route.post('/forum/forum_update/:id', 'ForumMessagingController.updateForumMessage')

Route.get('/forum_comments/:id', 'ForumCommentController.commentLoader')
Route.post('/forum_comments/:id', 'ForumCommentController.sendComment')
Route.get('/fourm_comments/:id', 'ForumCommentController.deleteComment')

Route.get('/friends', 'FriendController.renderFriends')
Route.get('/friends/:id', 'FriendController.friendMessagesLoader')
Route.post('/friends', 'FriendController.sendMessage')
Route.get('/friends/delete_message/:id', 'FriendController.deleteMessage')

Route.get('/businesses', 'BusinessController.loadBusinesses')
Route.on('add_business').render('creators/add_business')
Route.post('/businesses', 'BusinessController.postBusiness')
Route.get('businesses/delete/:id', 'BusinessController.deleteBusiness')
Route.get('/businesses/edit/:id', 'BusinessController.editBusiness')
Route.post('/businesses/update/:id', 'BusinessController.updateBusiness')

Route.get('/business_comments/:id', 'BusinessCommentController.commentsLoader')