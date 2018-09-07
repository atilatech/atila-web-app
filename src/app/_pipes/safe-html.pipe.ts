import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
//https://stackoverflow.com/questions/39857858/angular-2-domsanitizer-bypasssecuritytrusthtml-svg

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(public sanitized: DomSanitizer) {}
  transform(value) {
    
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
