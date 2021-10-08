import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminMiddleware {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    if (!auth.user?.profileId || auth.user.profileId !== 2) {
      return response.badRequest({ error: 'rota disponível apenas para admnistradores' })
    }

    await next()
  }
}
