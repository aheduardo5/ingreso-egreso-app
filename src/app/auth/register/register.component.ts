import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


    formGroupRegister!: FormGroup;

      constructor( private fb: FormBuilder, 
                   private authService: AuthService,
                   private router: Router){}

      ngOnInit(): void {
        this.formGroupRegister = this.fb.group({
          name: ['',[ Validators.required, Validators.minLength(5)]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(10)]]
        })
        
      }

      createUser(){
        if(this.formGroupRegister.invalid) return;
        //SweetAlert2
        Swal.fire({
          title: 'Wait a few seconds...',
          timer:2000,
          didOpen: () => {
            Swal.showLoading();
          }
        })

        const { name, email, password } = this.formGroupRegister.value;
        this.authService.createUser(name, email, password)
        .then( credentials => {
          Swal.close();
          this.router.navigate(['/']);
        })
        .catch( err => {
          //SweetAlert2close
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message
          })
        });
      }

  }
