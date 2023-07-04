import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logOutUser() {
    Swal.fire({
      title: 'Leaving...',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.authService.logOutUser().then((credentials) => {
      Swal.close();
      this.router.navigate(['/login']);
    });
  }
}
