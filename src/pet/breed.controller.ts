import { Controller } from '@nestjs/common';
import { BreedService } from './breed.service';

@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}
}
