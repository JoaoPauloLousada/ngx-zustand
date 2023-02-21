import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class TodoHttp extends HttpService {
  url = 'https://jsonplaceholder.typicode.com/todos';
}
