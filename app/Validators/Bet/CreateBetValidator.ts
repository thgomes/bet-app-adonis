import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateBetValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    userId: schema.number(),

    bets: schema.array().members(
      schema.object().members({
        userId: schema.number.optional(),
        gameId: schema.number(),
        price: schema.number(),
        selectedNumbers: schema.string.optional(),
      })
    ),
  })

  public messages = {}
}
