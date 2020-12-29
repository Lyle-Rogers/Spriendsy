'use strict'

class Friends {
  get rules () {
    return {
      'friend_message': 'required'
    }
  }

  get messages () {
    return {
      'required': 'You can not send an empty message.'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = Friends
