import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { signUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/logIn.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    public userModel: Model<User>,
    private jwtService: JwtService
  ){}

  async signUp(signUpDto: signUpDto): Promise<{ user: signUpDto }> {
    const {name, email, password} = signUpDto

    const hasedPassword = await bcrypt.hash( password, 10 );

    const user = await this.userModel.create({
      name,
      email,
      password: hasedPassword
    })
    
    this.jwtService.sign({ user })
    return { user };
  };

  async login( loginDto: LoginDto ): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ user });

    return { token };
  }

  async findUsers(name: string): Promise<User | null> {
    return this.userModel.findOne({ name }).exec();
  }

  async findById(id: string): Promise<User | null> {
    const existsUser =  this.userModel.findOne( {_id: id} );

    if(!existsUser) {
      throw new ConflictException(`User ${id} does not exists`)
    }

    return this.userModel.findOne({_id: id});
  }
}
