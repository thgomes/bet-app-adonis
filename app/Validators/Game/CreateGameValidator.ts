import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateGameValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    type: schema.string({ trim: true }, [
      rules.maxLength(50),
      rules.minLength(3),
      rules.unique({ table: 'games', column: 'type' }),
    ]),
    description: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(250)]),
    range: schema.number(),
    price: schema.number(),
    maxNumber: schema.number(),
    color: schema.string({ trim: true }, [rules.maxLength(10), rules.minLength(4)]),
  })

  public messages = {}
}
