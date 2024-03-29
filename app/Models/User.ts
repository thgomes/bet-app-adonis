import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeSave,
  hasMany,
  HasMany,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Token from 'App/Models/Token'
import Bet from 'App/Models/Bet'
import Profile from 'App/Models/Profile'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public profileId: number

  @column()
  public name: string

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public lastBetAt: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => Token)
  public tokens: HasMany<typeof Token>

  @hasMany(() => Bet)
  public bets: HasMany<typeof Bet>

  @belongsTo(() => Profile)
  public profile: BelongsTo<typeof Profile>
}
