import {ArrayNotEmpty, IsArray, Matches} from "class-validator";
import {IsValidJson} from "../../../../general/is-valid-json.decorator";

export class CreateTableReqDto {
    @Matches('[a-z]+[a-z_]*[a-z]+')
    tableName: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsValidJson({ each: true })
    jColumnExample: (string | number | boolean | null | any[] | Record<string, any>)[];
}