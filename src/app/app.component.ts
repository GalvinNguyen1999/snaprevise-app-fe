import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from './services/auth/auth.service'
import { Router } from '@angular/router';
import { User } from './interfaces/auth'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: MenuItem[] | undefined;
  isLoggedIn: boolean = false;
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    this.authService.user$.subscribe(user => {
      this.user = user;
    });

    this.items = [
      {
        items: [
          {
            label: 'Logout',
            icon: 'pi pi-power-off',
            command: () => {
              this.logout();
            }
          }
        ]
      }
   ]
  }

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      const user: any = JSON.parse(storedUser);
      this.authService.setUser(user);
      this.authService.setIsLoggedIn(true);
    }
  }

  login() {
    this.router.navigate(['login'])
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.setIsLoggedIn(false)
    this.router.navigate(['login'])
  }
}
