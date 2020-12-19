'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Business extends Model {
  comments () {
    this.hasMany('App/Models/BusinessComment')
  }
}

module.exports = Business
