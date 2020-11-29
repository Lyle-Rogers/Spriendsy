'use strict'

const User = use('App/Models/User')

class UserController {
  async create({ request, auth, response, session }) {
    const user = await User.create(request.only(['username', 'password']));

    await auth.login(user);

    return response.redirect('/forum')
  }

  async login({ request, auth, response }) {
    const { user_name, password, } = request.all();

    await auth.attempt(user_name, password);
    return response.redirect('/forum');
  }
}

module.exports = UserController
