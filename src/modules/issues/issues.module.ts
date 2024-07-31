import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Issue, issueShcema } from './schemas/issue.schema';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserSchema } from '../auth/schemas/user.schema';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory:(config: ConfigService) => {
        return {
          secret: 'jwt.JWT_SECRET',
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
    }),
    MongooseModule.forFeature([
    {name: Issue.name, schema: issueShcema},
    { name: 'User', schema: UserSchema }]),  
    AuthModule],
  controllers: [IssuesController],
  providers: [IssuesService, AuthService],
})
export class IssuesModule {}
