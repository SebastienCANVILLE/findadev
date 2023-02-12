import { PartialType } from '@nestjs/mapped-types';
import { CreateAmiDto } from './create-ami.dto';

export class UpdateAmiDto extends PartialType(CreateAmiDto) {
  pseudo: string;
  adress_line: string;
  zipCode: string;
  city: string;
  department: string;
  country: string;
  region: string;
  presentation: string;


}