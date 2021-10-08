import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string.optional({ trim: true }, [rules.maxLength(50), rules.minLength(3)]),
    profileId: schema.number.optional(),
    email: schema.string.optional({ trim: true }, [rules.maxLength(100)]),
    password: schema.string.optional({}, [
      rules.minLength(8),
      rules.maxLength(50),
      rules.confirmed(),
    ]),
    name: schema.string({ trim: true }, [rules.maxLength(100), rules.minLength(3)]),
  })

  public messages = {}
}
