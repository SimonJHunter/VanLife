import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'displayPrice'
})
export class DisplayPricePipe implements PipeTransform {
  transform(price: number, Symbol: string): string {
    return price ? Symbol + price.toFixed(2).toString() : 'Free';
  }
}
