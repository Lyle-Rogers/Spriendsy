'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BusinessCommentSchema extends Schema {
  up () {
    this.create('business_comments', (table) => {
      table.increments()
      table.integer('user_id')
      table.string('comment', 3000).notNullable()
      table.string('username')
      table.integer('business_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('business_comments')
  }
}

module.exports = BusinessCommentSchema
