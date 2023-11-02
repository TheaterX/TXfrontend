import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDirectorComponent } from './create-director/create-director.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ScenesComponent } from './scenes/scenes.component';
import { CreatePlayComponent } from './create-play/create-play.component';

const routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'actors&directors',
        component: CreateDirectorComponent
      },
      {
        path: 'scenes',
        component: ScenesComponent
      },
      {
        path: 'create-play',
        component: CreatePlayComponent
      }
]
  }
]


@NgModule({
  declarations: [
    CreateDirectorComponent,
    ScenesComponent,
    CreatePlayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminModule { }
