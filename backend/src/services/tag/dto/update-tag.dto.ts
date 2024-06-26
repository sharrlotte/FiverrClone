import { PartialType } from '@nestjs/swagger';
import { CreateTagDto } from 'src/services/tag/dto/create-tag.dto';

export class UpdateTagDto extends PartialType(CreateTagDto) {}
