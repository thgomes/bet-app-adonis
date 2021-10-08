import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({ trim: true }, [
      rules.maxLength(50),
      rules.minLength(3),
      rules.unique({ table: 'users', column: 'username' }),
    ]),
    profileId: schema.number(),
    email: schema.string({ trim: true }, [
      rules.maxLength(100),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({}, [rules.minLength(8), rules.maxLength(50), rules.confirmed()]),
    name: schema.string({ trim: true }, [rules.maxLength(100), rules.minLength(3)]),
  })

  public messages = {}
}
