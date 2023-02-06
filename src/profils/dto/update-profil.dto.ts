import { PartialType } from '@nestjs/mapped-types';
import { CreateProfilDto } from './create-profil.dto';

export class UpdateProfilDto extends PartialType(CreateProfilDto) {}
