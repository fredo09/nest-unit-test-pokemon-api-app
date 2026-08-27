import { PartialType } from '@nestjs/mapped-types';
import { CreatePokmeonDto } from './create-pokmeon.dto';

export class UpdatePokmeonDto extends PartialType(CreatePokmeonDto) {}
