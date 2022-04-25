import { Module } from '@nestjs/common';
import { ResumesModule } from './resumes/resumes.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    ResumesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DB_URL'),
        autoLoadEntities: true,
        // entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './files',
      }),
    }),

  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
