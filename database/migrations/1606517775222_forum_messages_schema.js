'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ForumMessagesSchema extends Schema {
  up () {
    this.create('forum_messages', (table) => {
      table.increments()
      table.integer('user_id')
      table.string('message')
      table.timestamps()
    })
  }

  down () {
    this.drop('forum_messages')
  }
}

module.exports = ForumMessagesSchema
