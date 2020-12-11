'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ForumCommentsSchema extends Schema {
  up () {
    this.create('forum_comments', (table) => {
      table.increments()
      table.string('comment')
      table.string('username')
      table.integer('forum_message_id')
      table.integer('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('forum_comments')
  }
}

module.exports = ForumCommentsSchema
