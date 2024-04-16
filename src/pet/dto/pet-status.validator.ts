import { registerDecorator, ValidationArguments } from 'class-validator';

export enum PetStatusDtoEnum {
  UNKNOWN = 'UNKNOWN',
  INCOMING = 'INCOMING',
  INSHELTER = 'INSHELTER',
  ILL = 'ILL',
  DECEASED = 'DECEASED',
}

export function IsEnumAndTransform(
  validationEnum: object,
  transformationEnum: object,
) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'isEnumAndTransform',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const isValid = Object.values(validationEnum).includes(value);
          if (isValid) {
            args.object[propertyName] = transformationEnum[value];
          }
          return isValid;
        },
        defaultMessage() {
          return `Expected value: ${Object.values(validationEnum).join(', ')}`;
        },
      },
    });
  };
}
