import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { CreateDirectorComponent } from './admin/create-director/create-director.component';

const routes: Routes = [
{ path: '', component: CreateDirectorComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
