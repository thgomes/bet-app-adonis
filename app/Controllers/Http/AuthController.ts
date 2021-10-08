import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)

    try {
      const user = await User.findBy('email', email)

      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '7days',
        name: user?.serialize().email,
      })
      return { token, user: user?.serialize() }
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
