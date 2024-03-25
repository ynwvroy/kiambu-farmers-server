import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserFactory } from 'Database/factories/UserFactory'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Create 10 generic user records using the factory
    await UserFactory.createMany(10)

    // Create specific user records
    await User.createMany([
      {
        full_name: 'Wahome Farmer',
        username: 'wahome',
        email: 'farmer@farmer.com',
        password: 'password',
        phone_number: '254712345678',
        user_type: 'farmer',
        is_verified: true,
      },
      {
        full_name: 'Maina User',
        username: 'user',
        email: 'user@user.com',
        password: 'password',
        phone_number: '2543232712345678',
        user_type: 'customer',
        is_verified: true,
      },
      {
        full_name: 'Innocent SuperAdmin',
        username: 'i_am_admin',
        email: 'admin@admin.com',
        password: 'password',
        phone_number: '25443434712345678',
        user_type: 'super_admin',
        is_verified: true,
      },
    ])
  }
}
