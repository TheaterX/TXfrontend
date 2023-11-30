import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation/reservation.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PlaysComponent } from './plays/plays.component';
import { PlayComponent } from './play/play.component';
import { YourReservationsComponent } from './your-reservations/your-reservations.component';

const routes = [
  {
    path: 'user',
    children: [
      {
        path: 'reservation',
        component: ReservationComponent
      },
      {
        path: 'plays',
        component: PlaysComponent
      },
      {
        path: 'play/:name',
        component: PlayComponent
      },
      {
        path: 'your-reservations',
        component: YourReservationsComponent
      }
]
  }
]

@NgModule({
  declarations: [
    ReservationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
