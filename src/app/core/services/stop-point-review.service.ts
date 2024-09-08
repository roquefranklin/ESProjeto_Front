import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StopPointReviewService {

  private http:HttpClient = Inject(HttpClient)
  
  constructor() {}
}
