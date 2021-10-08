import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        email: 'virk@adonisjs.com',
        profileId: 1,
        name: 'Virk Silva',
        username: 'virk',
        password: 'secret',
      },
      {
        email: 'romain@adonisjs.com',
        profileId: 1,
        name: 'Romain Pereira',
        username: 'romain',
        password: 'supersecret',
      },
    ])
  }
}
