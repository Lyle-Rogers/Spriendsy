'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class UserController {
  async create({ request, auth, response, session }) {
    const groupPass = request.input('group_pass');

    if(groupPass === "star light") {
      const user = await User.create(request.only(['username', 'password']));

      user.group_pass = true;

      await user.save();

      await auth.login(user);

      return response.redirect('/forum')
    } else {
      session.flash({ message: "The Group Pass is incorrect!" })

      return response.redirect('back')
    }
  }


  async login({ request, auth, session, response }) {
    const { username, password } = request.all();

    const user = await User.query()
      .where('username', username)
      .where('group_pass', true)
      .first()

    if (user) {
      const passwordVerified = await Hash.verify(password, user.password)

      if (passwordVerified) {
        await auth.remember(true).login(user)

        return response.route('/forum')
      } else {
        session.flash({ message: "Incorrect password." })

      return response.redirect('back')
      }
    } 
    session.flash({ message: "Couldn't find your username. Please check to see if it's correct or contact me for help." })

    return response.redirect('back')
  }
}

module.exports = UserController
