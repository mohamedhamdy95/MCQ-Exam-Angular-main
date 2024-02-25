import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }

  creatUser(model:any):Observable<any>{
   return this.http.post(environment.baseUrl+'students',model)
  }

  login(model:any){
    return this.http.put(environment.baseUrl+`login/1`,model)
  }

  getAllUsers(type:string):Observable<any>{
    return this.http.get(environment.baseUrl+`${type}`) 
  }

}

