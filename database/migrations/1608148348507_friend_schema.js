'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FriendSchema extends Schema {
  up () {
    this.create('friends', (table) => {
      table.increments()
      table.integer('user_id')
      table.integer('user_messaged_id')
      table.string('message', 3000).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('friends')
  }
}

module.exports = FriendSchema
