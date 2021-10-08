import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import moment from 'moment'
import User from 'App/Models/User'
import Token from 'App/Models/Token'
import CreateForgotPasswordValidator from 'App/Validators/ForgotPassword/CreateForgotPasswordValidator'
import ForgotPasswordMail from 'App/Mailers/ForgotPasswordMail'

export default class ForgotPasswordController {
  public async store({ auth, request, response }: HttpContextContract) {
    try {
      const { email, redirectUrl } = await request.validate(CreateForgotPasswordValidator)

      const user = await User.findByOrFail('email', email)

      const token = await auth.use('api').generate(user)

      await new ForgotPasswordMail(user, token, redirectUrl).sendLater()
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Algo nao deu certo, este email existe?' } })
    }
  }

  public async update({ request, response }) {
    try {
      const { token, password } = request.all()

      const tokenData = await Token.findByOrFail('token', token)

      const user = await User.findOrFail(tokenData.user_id)

      const tokenExpired = moment().subtract('2', 'days').isAfter(tokenData.createdAt)

      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: 'O Token de recuperacao esta expirado' } })
      }

      user.password = password

      await user.save()
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Algo deu errado ao resetar sua senha!' } })
    }
  }
}
