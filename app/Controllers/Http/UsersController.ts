import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import CreateUserMail from 'App/Mailers/CreateUserMail'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/User/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/User/UpdateUserValidator'

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page')
    const limit = 10

    const users = await Database.from('users').paginate(page, limit)

    return users
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(CreateUserValidator)

    const user = await User.create(data)

    await new CreateUserMail(user).sendLater()

    return user
  }

  public async show({ params }: HttpContextContract) {
    const user = User.findOrFail(params.id)

    return user
  }

  public async update({ params, request }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    const data = await request.validate(UpdateUserValidator)

    user.merge(data)

    await user.save()

    return user
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    await user.delete()

    return user
  }
}
