import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PetModule } from './pet/pet.module';
import { MediaModule } from './media/media.module';
import { AdoptionModule } from './adoption/adoption.module';
import { BreedModule } from './breed/breed.module';
import { LocationModule } from './location/location.module';
import { SpeciesModule } from './species/species.module';
import { AppController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from './role/role.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    LocationModule,
    MediaModule,
    PetModule,
    BreedModule,
    SpeciesModule,
    AdoptionModule,
    RoleModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
