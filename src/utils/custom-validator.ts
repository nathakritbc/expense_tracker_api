import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsDateFormat(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsDateFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          if (typeof value !== 'string') return false;
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!dateRegex.test(value)) return false;

          const date = new Date(value);
          if (isNaN(date.getTime())) return false;

          const [year, month, day] = value.split('-').map(Number);
          return date.getUTCFullYear() === year && date.getUTCMonth() + 1 === month && date.getUTCDate() === day;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be in the format YYYY-MM-DD`;
        },
      },
    });
  };
}

export function IsIntegerNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsIntegerNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'number' && Number.isInteger(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be an integer number`;
        },
      },
    });
  };
}
