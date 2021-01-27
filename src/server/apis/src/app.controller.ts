
import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service'
@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private  usersService: UsersService
    ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  async logout(@Request() req) {
    return this.authService.logout(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
  @UseGuards(JwtAuthGuard)
  @Get('user')
 async getuser(@Request() req) {
      const userName = req.user.username   
      //console.log("[NOTIFICATION]: Account login successful ..."+userName)
    // Logic 
    return await this.usersService.findUser(userName)
  }
  @UseGuards(JwtAuthGuard)
  @Get('user/address')
 async getaddress(@Request() req) {
      const userName = req.user.username   
      //console.log("[NOTIFICATION]: Account login successful ..."+userName)
    // Logic 
    return await this.usersService.findAddressbyUser(userName)
  }

}