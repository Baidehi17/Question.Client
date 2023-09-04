import {EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpEventService {

  public static reloadData = new EventEmitter();

}
