import { Injectable } from '@nestjs/common';

@Injectable()
export class DtoMapperService {
  mapToDto<T, K>(source: T, destinationClass: new () => K): K {
    const destination = new destinationClass();
    const dtoKeys = Object.keys(destination);
    dtoKeys.forEach((key) => {
      if (source.hasOwnProperty(key)) {
        destination[key] = source[key];
      }
    });
    return destination;
  }
}
