import { Component } from '@angular/core'
import { AuthService } from '../../services/auth/auth.service'
import { User } from '../../interfaces/auth'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user: User | null = null

  constructor(
    private authService: AuthService
  ) {
    this.authService.user$.subscribe(user => {
      this.user = user
    })
  }
}
