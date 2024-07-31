import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, projectSchema } from './schemas/project.schema';
import { AuthService } from '../auth/auth.service';
import { UserSchema } from '../auth/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';


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
    { name: Project.name, schema: projectSchema },
    { name: 'User', schema: UserSchema }
  ]),
    AuthModule
  ],
  controllers: [ProjectsController],
  providers: [AuthService, ProjectsService],
})
export class ProjectsModule {}
