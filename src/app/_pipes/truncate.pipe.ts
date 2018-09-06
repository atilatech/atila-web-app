import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, length: number) : string {

    // Set the limit to truncated
    let limit = length;

    // Truncate string if its greater than the limit
    if(value){
      return value.length > limit ? value.substring(0, limit) + "..." : value;
    }

    else{
      return value;
    }

  }

}
