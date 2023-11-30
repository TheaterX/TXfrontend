import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { FormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { PlaysComponent } from './user/plays/plays.component';
import { YourReservationsComponent } from './user/your-reservations/your-reservations.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PlayComponent } from './user/play/play.component';
import { AuthInterceptor } from './service/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    SiteHeaderComponent,
    PlaysComponent,
    YourReservationsComponent,
    RegisterComponent,
    LoginComponent,
    PlayComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    FormsModule,
    UserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
