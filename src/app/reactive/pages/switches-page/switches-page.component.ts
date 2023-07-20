import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validator.service';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', [Validators.required]],
    wantNotification: [true, [Validators.required]],
    termsConditions: [false,[Validators.requiredTrue]],

  })

  public person = {

    gender: 'F',
    wantNotification:false


  }


  
  constructor(private fb: FormBuilder, private validatorsService:ValidatorsService) { }
  ngOnInit(): void {
    this.myForm.reset(this.person);
  }
  

  isValidField(field: string):boolean |null{ 
    return this.validatorsService.isValidField(this.myForm, field);
  }





  onSave() {
    if (this.myForm.invalid) { 
    this.myForm.markAllAsTouched();
    return
    };

    const { termsConditions, ...newPerson } =this.myForm.value
    this.person=newPerson
    console.log(this.myForm.value)
    console.log(this.person)
    
  }


}
