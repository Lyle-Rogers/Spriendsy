'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ForumCommentsSchema extends Schema {
  up () {
    this.table('forum_comments', (table) => {
      table.string('comment', 3000).notNullable().alter()
    })
  }

  down () {
    this.table('forum_comments', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ForumCommentsSchema
