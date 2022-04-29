import {ArrayNotEmpty, IsArray, Matches} from "class-validator";
import {IsValidJson} from "../../../../general/is-valid-json.decorator";
import {JsonType} from "../../../../general/json.type";

export class CreateTableReqDto {
    @Matches('[a-z]+[a-z_]*[a-z]+')
    tableName: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsValidJson({ each: true })
    jColumnExamples: JsonType[];
}