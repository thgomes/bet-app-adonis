import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'

export default class CreateBetMail extends BaseMailer {
  constructor(private user: User) {
    super()
  }
  public prepare(message: MessageContract) {
    message
      .from('thiagosiqgomes@gmail.com', 'Thiago')
      .to('teste1@luby.com')
      .subject('Criação de apostas')
      .htmlView('emails.new_bets', {
        user: this.user.name,
      })
  }
}
