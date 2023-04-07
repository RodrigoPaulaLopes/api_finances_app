import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { jwtConstants } from '../auth/Jwtonstants';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {

     constructor(@InjectRepository(UsersEntity) private userRepository: Repository<UsersEntity>,) {

     }
     public async login(user: any) {

          try {
               const userFind = await this.userRepository.findOne({ where: { login: user.login, password: user.password } })
               if (!userFind) {
                    return "usuario não encontrado"
               } else {
                    const jwtService: JwtService = new JwtService()
                    const payload = { login: userFind.login, sub: userFind.id }
                    const token = await jwtService.signAsync(payload, { secret: jwtConstants.secret, expiresIn: '5h' })
                    return token
               };

          } catch (error) {
               return error
          }

     }
     public async register(user) {

          try {
               const userSaved = await this.userRepository.save(user)

               return userSaved
          } catch (error) {
               return error
          }

     }

     public async alterAccount(id, user) {

          try {

               const oldUser = await this.userRepository.findOne({ where: { id: id } })

               if (!oldUser) {
                    return "usuario não encontrado para fazer alteração"
               } else {

                    oldUser.name = user.name
                    oldUser.login = user.login
                    oldUser.password = user.password

                    const newUser = await this.userRepository.save(oldUser)

              
                    return newUser
               }
          } catch (error) {
               return error
          }


     }
}
