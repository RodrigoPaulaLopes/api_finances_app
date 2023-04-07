import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){

    }  

    @Post("login")
    public async login(@Body() user) {
        const userFind = await this.usersService.login(user)
        return {"response": userFind};        
    }


    @Post("register")
    public async register(@Body() user) {
        const registedUser = await this.usersService.register(user)
        return {"response": registedUser};
    }

    @Put("alter/:id")
    public async alterAccount(@Param('id') id, @Body() user) {
        const updatedUser = await this.usersService.alterAccount(id, user)
        return {"response": updatedUser};
    }
}
