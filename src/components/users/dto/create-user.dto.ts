import {OmitType} from '@nestjs/swagger';
import {FullUserDto} from './full-user.dto';

export class CreateUserDto extends OmitType(FullUserDto, [
    'createdAt',
    'updatedAt',
    '_id',
    'hasRabbitDb',
    'tables',
]) {
}
