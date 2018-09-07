import {SafeHtmlPipe} from './safe-html.pipe';
import {inject} from '@angular/core/testing';
import {DomSanitizer} from '@angular/platform-browser';


describe('SafeHtmlPipe', () => {
  it('create an instance', inject([DomSanitizer], (sanitizer: DomSanitizer) => {

    const pipe = new SafeHtmlPipe(sanitizer);
    expect(pipe).toBeTruthy();
  }));
});
