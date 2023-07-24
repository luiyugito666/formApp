import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validator.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
/* import * as cunstonValidators from 'src/app/shared/validators/validator';
 */

@Component({
  templateUrl: './register-page.component.html',
  
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({

        name:['',[Validators.required,Validators.pattern(this.validatosService.firstNameAndLastnamePattern)]],
       /*  email:['',[Validators.required,Validators.pattern(this.validatosService.emailPattern),],[new EmailValidatorService]], */
        email:['',[Validators.required,Validators.pattern(this.validatosService.emailPattern),],[this.emailValidatorService]],
        username:['',[Validators.required,this.validatosService.cantBeStrider]],
        password:['',[Validators.required,Validators.minLength(6)]],
        password2:['',[Validators.required]],
  }, {
    validators: [
      this.validatosService.isFieldOneEqualsTwo('password','password2'),

    ]
  })



  constructor(
    private fb: FormBuilder,
    private validatosService: ValidatorsService,
    private emailValidatorService:EmailValidatorService,
  )
    
    { }
  

  isValidField(field: string) { 
    return this.validatosService.isValidField(this.myForm, field);
  }


  onSubmit() { 
this.myForm.markAllAsTouched();

  }
    
 




}
