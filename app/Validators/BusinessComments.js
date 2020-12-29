'use strict'

class BusinessComments {
  get rules () {
    return {
      'business_comment_message': 'required'
    }
  }

  get messages () {
    return {
      'required': 'Please fill in the comment to continue.',
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = BusinessComments
