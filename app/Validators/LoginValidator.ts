import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.maxLength(100)]),
    password: schema.string({}, [rules.minLength(3), rules.maxLength(50)]),
  })

  public messages = {}
}
