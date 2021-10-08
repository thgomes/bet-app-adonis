import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateForgotPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(100)]),
    redirectUrl: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(100)]),
  })

  public messages = {}
}
