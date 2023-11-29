import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user: any;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
