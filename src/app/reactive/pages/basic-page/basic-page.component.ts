import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

const rtx5090 = {
  name:'rtx5090',
    price:100,
  inStorage:10
}


@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit{

  //public myForm: FormGroup = new FormGroup(
   // {

      // name:new FormControl('valor por defecto',[validaciones sincronas],[validaciones asincronas])
     /*  name:new FormControl(''),
      price:new FormControl(''),
      inStorage:new FormControl(''),
      
    }
  ); */

//otra opcion para crear con formBuilder, se debe de inyectar en el constructor
  
  public myForm: FormGroup = this.fb.group({

    name: ['', [Validators.required,Validators.minLength(3)]],
    price: [0,[Validators.required, Validators.min(0)]],
    inStorage: [0,[ Validators.required, Validators.min(0)]],

  })
  
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
/*     this.myForm.reset(rtx5090); */
  }
//metodo para simplicar la validacion si el campo es valido o no
  
  isValidField(field: string):boolean |null{ 
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }
  
  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {}
    
    for (const key of Object.keys(errors)) {
      switch (key) { 
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracters`
      }
      
    }

    return null;
   }









  onSave(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched(); 
      return;
    }
    console.log(this.myForm.value)
    this.myForm.reset({price:0, inStorage:0})

  }

}
