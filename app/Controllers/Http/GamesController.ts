import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Game from 'App/Models/Game'
import CreateGameValidator from 'App/Validators/Game/CreateGameValidator'
import UpdateGameValidator from 'App/Validators/Game/UpdateGameValidator'

export default class GamesController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page')
    const limit = 10

    const games = await Database.from('games').paginate(page, limit)

    return games
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(CreateGameValidator)

    const game = Game.create(data)

    return game
  }

  public async show({ params }: HttpContextContract) {
    const game = Game.findOrFail(params.id)

    return game
  }

  public async update({ params, request }: HttpContextContract) {
    const game = await Game.findOrFail(params.id)
    const data = await request.validate(UpdateGameValidator)

    game.merge(data)

    await game.save()

    return game
  }

  public async destroy({ params }: HttpContextContract) {
    const game = await Game.findOrFail(params.id)

    await game.delete()
  }
}
