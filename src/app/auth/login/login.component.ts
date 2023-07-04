import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  formGroupLogin!: FormGroup;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router){}

  ngOnInit(): void {
    this.formGroupLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  loginUser(){
    if(this.formGroupLogin.invalid) return;
    
    //SweetAlert2
    Swal.fire({
      title: 'Wait a few seconds...',
      timer:2000,
      didOpen: () => {
        Swal.showLoading();
      }
    })

    const {email, password} = this.formGroupLogin.value;
    this.authService.loginUser(email, password)
    .then( credentials =>{
      Swal.close();
      this.router.navigate(['/']);
    })
    .catch( err => {
      //SweetAlert2 close
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      })
    })
  }
}
