import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceExtra'
})
export class ReplaceExtraPipe implements PipeTransform {
// https://stackoverflow.com/questions/41563283/how-to-replace-string-in-angular-2
  transform(value: any, args?: any): any {
    let newValue = value.replace(/, Dividends, Splits and Trading Volume/g, '.');
    return `${newValue}`;
  }

}
