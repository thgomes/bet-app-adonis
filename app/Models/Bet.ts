import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Game from 'App/Models/Game'

export default class Bet extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public gameId: number

  @column()
  public price: number

  @column()
  public selectedNumbers: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Game)
  public game: BelongsTo<typeof Game>

  @beforeSave()
  public static convertToString(bet: Bet) {
    bet.selectedNumbers = bet.selectedNumbers.toString()
  }
}
