import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByDiscount',
})
export class OrderByDiscountPipe implements PipeTransform {
  transform(packages: any[]): any[] {
    if (!packages || packages.length <= 1) {
      return packages;
    }

    // Sort the packages based on the discount
    return packages.sort((a, b) => a.packageDiscount - b.packageDiscount);
  }
}