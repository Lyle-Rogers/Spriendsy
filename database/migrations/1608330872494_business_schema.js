'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BusinessSchema extends Schema {
  up () {
    this.create('businesses', (table) => {
      table.increments()
      table.integer('user_id')
      table.string('comment_amount').defaultTo(0)
      table.string('name', 100).notNullable()
      table.string('owner_name')
      table.string('description', 8000).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('businesses')
  }
}

module.exports = BusinessSchema
