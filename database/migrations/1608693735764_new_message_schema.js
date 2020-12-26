'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NewMessageSchema extends Schema {
  up () {
    this.create('new_messages', (table) => {
      table.increments()
      table.integer('to')
      table.string('sender_username')
      table.integer('sender_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('new_messages')
  }
}

module.exports = NewMessageSchema
