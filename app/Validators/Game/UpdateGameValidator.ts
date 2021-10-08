import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateGameValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    type: schema.string.optional({ trim: true }, [rules.maxLength(50), rules.minLength(3)]),
    description: schema.string.optional({ trim: true }, [rules.minLength(3), rules.maxLength(250)]),
    range: schema.number.optional(),
    price: schema.number.optional(),
    maxNumber: schema.number.optional(),
    color: schema.string.optional({ trim: true }, [rules.maxLength(10), rules.minLength(4)]),
  })

  public messages = {}
}
