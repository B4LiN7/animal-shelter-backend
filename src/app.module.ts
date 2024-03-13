import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PetModule } from './pet/pet.module';
import { MediaModule } from './media/media.module';
import { AdoptionModule } from './adoption/adoption.module';
import { BreedModule } from './breed/breed.module';
import { LocationModule } from './location/location.module';
import { SpeciesModule } from './species/species.module';
import { JwtGlobalModule } from './jwtGlobal.module';

@Module({
  imports: [
    JwtGlobalModule,
    AuthModule,
    UserModule,
    LocationModule,
    MediaModule,
    PetModule,
    BreedModule,
    SpeciesModule,
    AdoptionModule,
  ],
})
export class AppModule {}
