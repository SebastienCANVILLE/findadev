import { PartialType } from '@nestjs/mapped-types';
import { CreateLangageDto } from './create-langage.dto';

export class UpdateLangageDto extends PartialType(CreateLangageDto) {}
