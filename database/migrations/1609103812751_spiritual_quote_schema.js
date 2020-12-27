'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SpiritualQuoteSchema extends Schema {
  up () {
    this.create('spiritual_quotes', (table) => {
      table.increments()
      table.integer('user_id')
      table.string('quote', 3000).notNullable()
      table.string('username')
      table.timestamps()
    })
  }

  down () {
    this.drop('spiritual_quotes')
  }
}

module.exports = SpiritualQuoteSchema
