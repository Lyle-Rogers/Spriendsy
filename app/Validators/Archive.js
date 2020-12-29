'use strict'

class Archive {
  get rules () {
    return {
      'spiritual_quote': 'required'
    }
  }

  get messages () {
    return {
      'required': 'Please fill in the quote to continue.',
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = Archive
