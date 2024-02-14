import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PetModule } from './pet/pet.module';
import { UtilityModule } from './utility/utility.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [AuthModule, UserModule, PetModule, UtilityModule, MediaModule],
})
export class AppModule {}
