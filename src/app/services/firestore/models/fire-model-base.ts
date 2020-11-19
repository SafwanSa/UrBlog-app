import { classToPlain } from 'class-transformer';

export abstract class FireModelBase {
  id: string;

  toData(): object {
    return classToPlain(this);
  }
}
