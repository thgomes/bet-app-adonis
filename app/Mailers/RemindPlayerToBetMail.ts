import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'

export default class RemindPlayerToBetMail extends BaseMailer {
  constructor(private user: User) {
    super()
  }

  public prepare(message: MessageContract) {
    message
      .from('thiagosiqgomes@gmail.com', 'Thiago')
      .to('teste1@luby.com')
      .subject('Recuperacao de senha')
      .htmlView('emails.remember_player_to_bet', {
        user: this.user.name,
      })
  }
}
