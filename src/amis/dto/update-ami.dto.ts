import { PartialType } from '@nestjs/mapped-types';
import { CreateAmiDto } from './create-ami.dto';

export class UpdateAmiDto extends PartialType(CreateAmiDto) {
  pseudo: string;

}