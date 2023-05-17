import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


    formGroupRegister!: FormGroup;

      constructor( private fb: FormBuilder){}

      ngOnInit(): void {
        this.formGroupRegister = this.fb.group({
          name: ['',[ Validators.required, Validators.minLength(5)]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(10)]]
        })
        
      }

      createUser(){
        console.log(this.formGroupRegister.value);
      }

  }
