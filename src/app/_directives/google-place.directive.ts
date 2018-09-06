import { Directive, ElementRef, EventEmitter, Output} from '@angular/core';
import {NgModel} from '@angular/forms';
//import "googlemaps"; //You can ncomment this line while coding for typings help.
declare var google: any;



@Directive({
  selector: '[appGooglePlace]',
  providers: [NgModel],
  host: {
    '(input)' : 'onInputChange()'
  }
})
//https://stackoverflow.com/questions/42341930/google-places-autocomplete-angular2

export class GooglePlaceDirective {
 /**
 * This directive is used to add the [Google Place Autocomplete Api]{@link https://developers.google.com/maps/documentation/javascript/places-autocomplete#address_forms} to an input element
 */
     @Output() setAddress: EventEmitter<any> = new EventEmitter();
     @Output() googlePlaceNoLoad: EventEmitter<any> = new EventEmitter();
      modelValue:any;
      autocomplete:any;
      public _el:HTMLElement;

    //Adding Autocomplete for User Location:
  // https://developers.google.com/maps/documentation/javascript/places-autocomplete#address_forms
  // https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform
  //https://stackoverflow.com/questions/42341930/google-places-autocomplete-angular2

    constructor(el: ElementRef,public model:NgModel) {
      this._el = el.nativeElement;
      this.modelValue = this.model;
      var input = this._el;
      if(typeof google !== 'undefined'){
      this.autocomplete = new google.maps.places.Autocomplete(<HTMLInputElement>input, {});
      google.maps.event.addListener(this.autocomplete, 'place_changed', ()=> {
        var place = this.autocomplete.getPlace();


        this.invokeEvent(place);

      });
      }

      else{
        //TODO: Emit event to tell preview form that Google Autocomplete is not working.
        this.googlePlaceNoLoad.emit();
      }
    }

    invokeEvent(place:Object) {
      this.setAddress.emit(place);
    }

    onInputChange() {
    }
  }
