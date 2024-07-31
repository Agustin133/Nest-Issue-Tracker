import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/logIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @Post('/signup')
  signUp(@Body() signUpDto: signUpDto): Promise<{ user: signUpDto }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Get('/user/:id')
  findById(@Param('id') id: string) {
    return this.authService.findById(id);
  }
}
