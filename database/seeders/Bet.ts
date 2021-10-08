import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Bet from 'App/Models/Bet'

export default class BetSeeder extends BaseSeeder {
  public async run() {
    await Bet.createMany([
      {
        userId: 1,
        gameId: 1,
        price: 4.5,
        selectedNumbers: '1,2,3,4,5,6,7',
      },
      {
        userId: 1,
        gameId: 2,
        price: 4.5,
        selectedNumbers: '1,2,3,4,7',
      },
    ])
  }
}
