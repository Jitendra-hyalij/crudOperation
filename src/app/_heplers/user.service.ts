import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private API_BASE_PATH:string='http://localhost:4200/api/';
  constructor(private _httpCilent:HttpClient) { }

  getUsers(){
    return this._httpCilent.get(this.API_BASE_PATH+"users");
  }
  deleteUser(UserId:number){
      return this._httpCilent.delete(`${this.API_BASE_PATH}users/${UserId}`)
  }
  getUser(id:number){
    return this._httpCilent.get(`${this.API_BASE_PATH}users/${id}`)
  }
  addUser(user:User){
    return this._httpCilent.post(`${this.API_BASE_PATH}users/`,user)
  }
  updateUser(user:User){
    return this._httpCilent.put(`${this.API_BASE_PATH}users/${user.id}`,user)
  }
  
}
