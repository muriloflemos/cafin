import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

const removeEmpty = (obj: any) => {
  let newObj: any = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] === Object(obj[key]) && !Array.isArray(obj[key])) {
      newObj[key] = removeEmpty(obj[key]);
    } else if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  public get<T>(path: string, params: any = {}): Observable<T> {
    return this.http.get<T>(this.baseUrl + path, { params: removeEmpty(params) });
  }

  public post<T>(path: string, body: any = {}): Observable<T> {
    return this.http.post<T>(this.baseUrl + path, removeEmpty(body));
  }

  public put<T>(path: string, body: any = {}): Observable<T> {
    return this.http.put<T>(this.baseUrl + path, removeEmpty(body));
  }

  public delete<T>(path: string, params: any = {}): Observable<T> {
    return this.http.delete<T>(this.baseUrl + path, { params });
  }
}
