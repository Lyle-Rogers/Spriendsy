'use strict'

class Forum {
  get rules () {
    return {
      'forum_message': 'required'
    }
  }

  get messages () {
    return {
      'required': 'You must first fill in the message to continue.'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = Forum
