import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateBetValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    userId: schema.number.optional(),
    gameId: schema.number.optional(),
    price: schema.number.optional(),
    selectedNumbers: schema.string.optional(),
  })

  public messages = {}
}
