import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bets extends BaseSchema {
  protected tableName = 'bets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('game_id').unsigned().references('id').inTable('games').onDelete('CASCADE')
      table.double('price').notNullable()
      table.string('selected_numbers').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
