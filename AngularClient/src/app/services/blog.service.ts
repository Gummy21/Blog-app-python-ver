import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



const baseUrl = 'http://localhost:8000/api/blogs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {  
  constructor(private http: HttpClient) { }

  getAll() {
   
    return this.http.get(baseUrl);
   
  }
  get(id) {
    return this.http.get(`${baseUrl}/${id}`)
  }

  create(data) {
    return this.http.post(baseUrl, data);
  }

  update(id,data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
      return this.http.delete(`${baseUrl}/${id}`)
    }

  find(title) {
    return this.http.get(`${baseUrl}?title=${title}`);
  }

}
