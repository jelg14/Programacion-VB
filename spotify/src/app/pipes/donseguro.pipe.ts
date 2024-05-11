import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'donseguro',
  standalone: true
})
export class DonseguroPipe implements PipeTransform {

  constructor(private domSanitazer: DomSanitizer){}

  transform(value: string): any {
    const url = 'https://open.spotify.com/embed?url='
    return this.domSanitazer.bypassSecurityTrustResourceUrl(url+value);
  }

}
