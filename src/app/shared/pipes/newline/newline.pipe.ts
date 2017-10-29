import { Pipe, PipeTransform } from '@angular/core';

/**
 * New line pipe
 */
@Pipe({
  name: 'newline',
})
export class NewlinePipe implements PipeTransform {
  transform(value: string, ...args) {
    if (!value) {
      return;
    }
    return value.replace(/(?:\r\n|\r|\n)/g, '<br />');
  }
}
