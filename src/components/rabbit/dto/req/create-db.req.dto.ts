import {Matches} from "class-validator";

export class CreateDbReqDto {
    @Matches('[a-z]+[a-z_]*[a-z]+')
    tableName: string;
}