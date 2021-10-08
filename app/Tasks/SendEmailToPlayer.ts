import { BaseTask } from 'adonis5-scheduler/build'
import Database from '@ioc:Adonis/Lucid/Database'
import moment from 'moment'
import RemindPlayerToBetMail from 'App/Mailers/RemindPlayerToBetMail'

export default class SendEmailToPlayer extends BaseTask {
  public static get schedule() {
    return '0 0 9 ? * *'
  }

  public static get useLock() {
    return false
  }

  public async handle() {
    const users = await Database.query()
      .from('users')
      .select('*')
      .where('last_bet_at', '>', moment().subtract(7, 'd').format('YYYY-MM-DD'))

    users.forEach(async (user) => {
      await new RemindPlayerToBetMail(user).sendLater()
    })
  }
}
