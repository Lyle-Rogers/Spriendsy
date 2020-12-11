'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ForumMessagesSchema extends Schema {
  up () {
    this.table('forum_messages', (table) => {
      table.string('username')
    })
  }

  down () {
    this.table('forum_messages', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ForumMessagesSchema
