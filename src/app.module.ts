import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configurationMongo } from './configuration/configuration-mongo';
import { IssuesModule } from './modules/issues/issues.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurationMongo],
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Importa ConfigModule aquí
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongo.MONGO_URI'), // Usa configService para obtener la URI de MongoDB
        dbName: 'Issue-Tracker'
      }),
      inject: [ConfigService], // Inyecta ConfigService
      
    }),
    IssuesModule,
    AuthModule,
    ProjectsModule
  ],
})
export class AppModule {}
