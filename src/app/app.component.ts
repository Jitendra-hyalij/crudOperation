import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { DBOperation } from './_heplers/db-operation';
import { mustMatch } from './_heplers/must-match-valitors';
import { User } from './_heplers/user.interface';
import { UserService } from './_heplers/user.service';
// import 'ngx-toastr/toastr-bs4-alert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crudOper';
  registerForm!: FormGroup;
  users:User[]=[];
  submitted:boolean=false;
  buttonText:string="submit";
  bdops!: DBOperation;
  constructor(private _fb:FormBuilder, private _userService:UserService){} 
  
  ngOnInit(){
    this.setFromState();
    this.getAllUsers()
  }

  onSubmit(){
    this.submitted=true;
    // console.warn(this.registerForm.value);  
    if(this.registerForm.invalid){
      return;
    }

    switch(this.bdops){
      case DBOperation.create:
        this._userService.addUser(this.registerForm.value).subscribe(res=>{
          // this._tostr.success("Added !","success!");
          this.getAllUsers();
          this.onCancel();
        })
      break;

      case DBOperation.update:
        this._userService.updateUser(this.registerForm.value).subscribe(res=>{
          // this._tostr.success("Success","Updated");
          this.getAllUsers();
          this.onCancel();
        })
        break;

    }


  }
  onCancel(){
    this.registerForm.reset();
    this.buttonText="submit";
    this.bdops=DBOperation.create;
    this.submitted=false;
  }
 
getAllUsers(){
  this._userService.getUsers().subscribe((res:any)=>{
    this.users=res;
    debugger;
    console.log(res);
  })
}
edit(userId:number){
  this.buttonText="update";
    this.bdops=DBOperation.update;

  let user:any=this.users.find((u:User)=>u.id===userId);
  this.registerForm.patchValue(user);

  this.registerForm.get('password')?.setValue('');
  this.registerForm.get('confirmPassword')?.setValue('');
  this.registerForm.get('acceptTerms')?.setValue(false);




}



delete(userId:number){
  // this._userService.deleteUser(userId).subscribe(res=>{
  //   this.getAllUsers();
  // });
  
    Swal.fire({
        title:'Are you sure?',
        text:'you will be not able to recover this record',
        icon:'warning',
        showCancelButton:true,
        confirmButtonText:'Yes delete it!',
        cancelButtonText:'No, Keep it!'

    }).then((result)=>{
      if(result.value){
          this._userService.deleteUser(userId).subscribe(res=>{
    this.getAllUsers();
  });
        Swal.fire(
          'Deleted',
          'your record has been deleted',
          'success',
        )
      } else if(result.dismiss === Swal.DismissReason.cancel){
        Swal.fire(
          'cancel',
          'your record is Safe :)',
          'error'
        )
      }
    })
  
}
  setFromState(){
    this.buttonText="submit";
    this.bdops=DBOperation.create;


    this.registerForm = this._fb.group({
      id:[0],
      title:['',Validators.required],
      firstName: ['',Validators.compose([Validators.required,Validators.minLength(3), Validators.maxLength(10)])],
      lastName: ['',Validators.compose([Validators.required,Validators.minLength(3), Validators.maxLength(10)])],
      email :['',Validators.compose([Validators.required,Validators.email])],
      dob: ['',Validators.compose([Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)])],
      password :['',Validators.compose([Validators.required,Validators.minLength(6)])],
      confirmPassword:['',Validators.required],
      acceptTerms:[false,Validators.requiredTrue]
    },{
        validators : mustMatch('password','confirmPassword')
    });

    // this.registerForm = new FormGroup({
    //     id:new FormControl(0),
    //     title:new FormControl('',Validators.required),
    //     firstName:new FormControl('',Validators.compose([Validators.required,Validators.minLength(3), Validators.maxLength(10)])),
    //     lastName:new FormControl('',Validators.compose([Validators.required,Validators.minLength(3), Validators.maxLength(10)])),
    //     email :new FormControl('',Validators.compose([Validators.required,Validators.email])),
    //     dob: new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)])),
    //     password :new FormControl('',Validators.compose([Validators.required,Validators.minLength(6)])),
    //     confirmPassword:new FormControl('',Validators.required),
    //     acceptTerms:new FormControl(false,Validators.requiredTrue)
    //   },
    //     mustMatch('password','confirmPassword')
    //   );
  }
  
  get f(){
    return this.registerForm.controls;
  }

  
}
