'use strict'

class Login {
  get rules () {
    return {
      'username': 'required',
      'password': 'required'
    }
  }

  get messages () {
    return {
      'required': 'You must fill in the {{ field }} field to continue.'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = Login
