'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ForumMessage extends Model {
  forumComments () {
    return this.hasMany('App/Models/ForumComment')
  }
}

module.exports = ForumMessage
