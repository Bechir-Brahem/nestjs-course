import { Module } from '@nestjs/common';
import { ResumesModule } from './resumes/resumes.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { UsersModule } from './users/users.module';
import { SkillsModule } from './skills/skills.module';


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

    UsersModule,

    SkillsModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
