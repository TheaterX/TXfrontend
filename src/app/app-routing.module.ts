import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { CreateDirectorComponent } from './admin/create-director/create-director.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
{ path: '', component: LoginComponent },
{ path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
