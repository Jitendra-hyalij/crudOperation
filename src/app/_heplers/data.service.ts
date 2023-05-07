import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api'
import { User } from './user.interface';
@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService{

  constructor() { }
  createDb(){
    let users:User[]=[
      {id:1, title:'Mr',firstName:'Ajit',lastName:'singh',dob:'2000-05-15',email:'ajit@gmail.com',password:'123456',acceptTerms:true},
      {id:2, title:'Mr',firstName:'chandan',lastName:'singh',dob:'2000-06-15',email:'chandan@gmail.com',password:'1234556',acceptTerms:true}

    ]
    return { users};
  }
  
}
