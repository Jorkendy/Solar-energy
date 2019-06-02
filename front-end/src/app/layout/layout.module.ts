import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';
import {SharedModule} from "../shared/shared.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapGpsComponent } from './map-gps/map-gps.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import { IntroduceComponent } from './introduce/introduce.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
    declarations: [LayoutComponent, DashboardComponent, MapGpsComponent, IntroduceComponent, StatisticsComponent],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        SharedModule,
        FlexLayoutModule,
        ReactiveFormsModule
    ]
})
export class LayoutModule {
}
