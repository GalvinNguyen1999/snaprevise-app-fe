import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from './services/auth/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'angular-primeng-app';
  items: MenuItem[] | undefined;
  isLoggedIn: boolean = false;
  user: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      const user: any = JSON.parse(storedUser);
      this.authService.setUser(user);
      this.authService.setIsLoggedIn(true);
    }

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
   ];
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

  register() {
    this.router.navigate(['register'])
  }

}
