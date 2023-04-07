import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from '../auth/Jwtonstants';
import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity]),
    ],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule { }
