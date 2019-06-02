import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from "./layout.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MapGpsComponent} from "./map-gps/map-gps.component";
import {IntroduceComponent} from "./introduce/introduce.component";
import {StatisticsComponent} from "./statistics/statistics.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'introduce',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'maps',
        component: MapGpsComponent
      },
      {
        path: 'introduce',
        component: IntroduceComponent,
      },
      {
        path: 'statistics',
        component: StatisticsComponent
      },
      {
        path: 'statistics/:uuid',
        component: StatisticsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
