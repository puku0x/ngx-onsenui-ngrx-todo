import { Pipe, PipeTransform } from '@angular/core';

/**
 * Sanitize pipe
 *
 * @example
 *   some.value = '<script>alert('test')</script>'
 *   <div [innerHTML]="some.value | sanitize"></div>
 */
@Pipe({
  name: 'sanitize',
})
export class SanitizePipe implements PipeTransform {
  transform(value: string, ...args) {
    if (!value) {
      return;
    }
    return value.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
