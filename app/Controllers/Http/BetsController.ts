import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import CreateBetMail from 'App/Mailers/CreateBetMail'
import Bet from 'App/Models/Bet'
import User from 'App/Models/User'
import CreateBetValidator from 'App/Validators/Bet/CreateBetValidator'
import UpdateBetValidator from 'App/Validators/Bet/UpdateBetValidator'
import moment from 'moment'

export default class BetsController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page')
    const limit = 10

    const bets = await Database.from('bets').paginate(page, limit)

    return bets
  }

  public async store({ request }: HttpContextContract) {
    const bets = await request.validate(CreateBetValidator)
    const user = await User.findOrFail(bets.userId)

    bets.bets.forEach(async (bet) => {
      bet.userId = bets.userId
      await Bet.create(bet)
    })

    user.merge({ lastBetAt: moment().format('YYYY-MM-DD HH:mm') })

    await user.save()

    await new CreateBetMail(user).sendLater()
  }

  public async show({ params }: HttpContextContract) {
    const bet = Bet.findOrFail(params.id)

    return bet
  }

  public async update({ params, request }: HttpContextContract) {
    const bet = await Bet.findOrFail(params.id)
    const data = await request.validate(UpdateBetValidator)

    bet.merge(data)

    await bet.save()

    return bet
  }

  public async destroy({ params }: HttpContextContract) {
    const bet = await Bet.findOrFail(params.id)

    await bet.delete()
  }
}
