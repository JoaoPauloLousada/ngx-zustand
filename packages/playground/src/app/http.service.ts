import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class HttpService {
  private http = inject(HttpClient);
  abstract url: string;

  get<T>() {
    return this.http.get<T>(this.url);
  }
}
