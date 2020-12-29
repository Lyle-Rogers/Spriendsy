'use strict'

class Business {
  get rules () {
    return {
      'description': 'required'
    }
  }

  get messages () {
    return {
      'required': 'Please fill in the description to continue.',
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = Business
