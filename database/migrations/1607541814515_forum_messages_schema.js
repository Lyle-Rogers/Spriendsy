'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ForumMessagesSchema extends Schema {
  up () {
    this.alter('forum_messages', (table) => {
      table.string('comment_amount').defaultTo(0).alter()
    })
  }

  down () {
    this.table('forum_messages', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ForumMessagesSchema
