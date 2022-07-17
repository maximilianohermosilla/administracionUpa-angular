import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  blockUI$ = new Subject<boolean>();

  show(): void{
    this.blockUI$.next(true);
  }
  hide(): void{
    this.blockUI$.next(false);
  }
  constructor() { }
}
