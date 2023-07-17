import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {


  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ])

  })

  public newFavorite: FormControl = new FormControl('',[Validators.required]);


  constructor(private fb: FormBuilder) { }
  
  get favoriteGamesControl() { 
    return this.myForm.get('favoriteGames') as FormArray;
  }


  isValidField(field: string):boolean |null{ 
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }
  isValidFieldInArray(formArray: FormArray, index:number):boolean |null{ 
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
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

  onDeleteFavoriteGame(index: number): void { 
    this.favoriteGamesControl.removeAt(index);

  }

  onAddToFavorite() {
    if (this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    this.favoriteGamesControl.push(this.fb.control(newGame, Validators.required));

    this.newFavorite.reset();

   }






  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return 
    }
    console.log(this.myForm.value);

    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);

    this.myForm.reset();
  }
}
