import {registerDecorator, ValidationOptions} from 'class-validator';

export function IsValidJson(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'IsValidJson',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any) {
                    console.log('hello world');
                    try {
                        JSON.parse(JSON.stringify(value));

                        return true;
                    } catch (error) {
                        return false;
                    }
                },
            },
        });
    };
}