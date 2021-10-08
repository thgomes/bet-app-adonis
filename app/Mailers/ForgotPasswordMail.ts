import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import { OpaqueTokenContract } from '@ioc:Adonis/Addons/Auth'

export default class ForgotPasswordMail extends BaseMailer {
  constructor(
    private user: User,
    private token: OpaqueTokenContract<User>,
    private redirectUrl: String
  ) {
    super()
  }

  public prepare(message: MessageContract) {
    message
      .from('thiagosiqgomes@gmail.com', 'Thiago')
      .to('teste1@luby.com')
      .subject('Recuperacao de senha')
      .htmlView('emails.forgot_password', {
        user: this.user.name,
        token: this.token,
        toke: this.redirectUrl,
      })
  }
}
