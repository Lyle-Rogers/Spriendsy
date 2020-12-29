'use strict'

class ProfileSettings {
  get rules () {
    return {
      'username': 'required'
    }
  }

  get messages () {
    return {
      'required': 'You must fill in your username to continue.'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = ProfileSettings
