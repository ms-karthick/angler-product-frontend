import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/api/product');
  }

  get(id: any): Observable<Product> {
    return this.http.get<Product>(`${'http://localhost:3000/api/product/edit'}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/product/add', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${'http://localhost:3000/api/product/edit'}/${id}`, data);
  }

}
