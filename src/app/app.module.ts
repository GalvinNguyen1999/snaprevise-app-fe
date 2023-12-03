import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { HomeComponent } from './components/home/home.component'
import { CardModule } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { HttpClientModule } from '@angular/common/http'
import { ToastModule } from 'primeng/toast'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MessageService } from 'primeng/api'
import { AvatarModule } from 'primeng/avatar'
import { MenuModule } from 'primeng/menu'
import { AdminComponent } from './components/admin/admin.component'
import { MapSubmissionComponent } from './components/map-submission/map-submission.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    MapSubmissionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    AvatarModule,
    MenuModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
