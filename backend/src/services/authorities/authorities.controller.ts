import { Controller, Get } from '@nestjs/common';
import { AuthoritiesService } from './authorities.service';
import { plainToInstance } from 'class-transformer';
import { AuthorityDto } from 'src/services/role/dto/role.dto';

@Controller('authorities')
export class AuthoritiesController {
  constructor(private readonly authoritiesService: AuthoritiesService) {}

  @Get()
  findAll() {
    return this.authoritiesService.findAll().then((items) => items.map((item) => plainToInstance(AuthorityDto, item)));
  }
}
