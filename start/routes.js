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

Route.get('/', 'ForumMessagingController.messagesLoader').middleware(['auth'])

Route.on('/login').render('auth/login')
Route.post('/login', 'UserController.login').validator('Login')

Route.on('/register').render('auth/register')
Route.post('/register', 'UserController.create').validator('Register')

Route.get('/logout', async ({ auth, response }) => {
  await auth.logout();
  return response.redirect('/login');
})

Route.get('/forum', 'ForumMessagingController.messagesLoader').middleware(['auth'])
Route.post('/forum', 'ForumMessagingController.sendMessage').validator('Forum')
Route.get('/forum/forum_delete/:id', 'ForumMessagingController.deleteForumMessage')
Route.get('/forum/forum_edit/:id', 'ForumMessagingController.editForumMessage')
Route.post('/forum/forum_update/:id', 'ForumMessagingController.updateForumMessage').validator('Forum')

Route.get('/forum_comments/:id', 'ForumCommentController.commentLoader').middleware(['auth'])
Route.post('/forum_comments/:id', 'ForumCommentController.sendComment').validator('ForumComments')
Route.get('/fourm_comments/:id', 'ForumCommentController.deleteComment')

Route.get('/friends', 'FriendController.renderFriends').middleware(['auth'])
Route.get('/friends/:id', 'FriendController.friendMessagesLoader')
Route.post('/friends', 'FriendController.sendMessage').validator('Friends')
Route.get('/friends/delete_message/:id', 'FriendController.deleteMessage')

Route.get('/businesses', 'BusinessController.loadBusinesses').middleware(['auth'])
Route.on('add_business').render('creators/add_business')
Route.post('/businesses', 'BusinessController.postBusiness').validator('Business')
Route.get('businesses/delete/:id', 'BusinessController.deleteBusiness')
Route.get('/businesses/edit/:id', 'BusinessController.editBusiness')
Route.post('/businesses/update/:id', 'BusinessController.updateBusiness').validator('Business')

Route.get('/business_comments/:id', 'BusinessCommentController.commentsLoader').middleware(['auth'])
Route.post('/business_comments/:id', 'BusinessCommentController.sendComment').validator('BusinessComments')
Route.get('/business_comments/delete/:id', 'BusinessCommentController.deleteComment')

Route.get('/archive', 'ArchiveController.loadQuotes').middleware(['auth'])
Route.post('/archive', 'ArchiveController.sendQuote').validator('Archive')
Route.get('/archive/delete/:id', 'ArchiveController.deleteQuote')
Route.get('/archive/edit/:id', 'ArchiveController.editQuote')

Route.get('/profile_settings', 'ProfileSettingController.loadEverything').middleware(['auth'])
Route.get('/profile_settings/:to/:sender_id', 'ProfileSettingController.newMessageClicked')
Route.get('/profile_settings/delete/:to/:sender_id', 'ProfileSettingController.deleteNewMessages')
Route.get('/profile_settings/in_lebaron_click', 'ProfileSettingController.inLebaronClick')
Route.get('/profile_settings/friendly_click', 'ProfileSettingController.friendlyClick')
Route.post('/profile_settings', 'ProfileSettingController.saveUsername')
