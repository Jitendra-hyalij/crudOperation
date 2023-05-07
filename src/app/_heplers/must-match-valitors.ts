import { FormGroup } from "@angular/forms";

export function mustMatch(password:string, confirmPassword:string){
    return (FormGroup:FormGroup)=>{
        const passwordControl = FormGroup.controls[password];
        const confirmPasswordControl = FormGroup.controls[confirmPassword];


        if(confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']){
            return;
        }
        if(passwordControl.value!== confirmPasswordControl.value)
        {
            confirmPasswordControl.setErrors({mustMatch:true});
        }else{
            confirmPasswordControl.setErrors(null);
        }
    }
}


//########### New Version ###################3

// import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// export function mustMatch(password: string, confirmPassword: string): ValidatorFn {
//   return (ctrl: AbstractControl): ValidationErrors | null => {
//     const passwordControl = ctrl.get(password);
//     const confirmPasswordControl = ctrl.get(confirmPassword);

//     if (confirmPasswordControl?.errors&& !confirmPasswordControl.errors) {
//            return null;
//     } 

//     if (passwordControl?.value !== confirmPasswordControl?.value['mustMatch']) {
//         confirmPasswordControl?.setErrors({mustMatch:true})
//     } else {
//       confirmPasswordControl?.setErrors(null)
//     }
//         return null;

//   }
// }