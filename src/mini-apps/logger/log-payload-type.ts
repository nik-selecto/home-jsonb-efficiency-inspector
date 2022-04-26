import {OurAppEnum} from "../../general/our-app.enum";

export type LogPayloadType = {
    message: string,
    optionalParams?: any[],
    fromApp: OurAppEnum,
}
