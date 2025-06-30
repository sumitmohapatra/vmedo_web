import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '-';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {            
    return date ?  date.day.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    }) + this.DELIMITER + date.month.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    }) + this.DELIMITER + date.year.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    }) : '';
  }
}