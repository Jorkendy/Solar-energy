import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import { TopnavComponent } from './layout/topnav/topnav.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {TranslateModule} from "@ngx-translate/core";
import { LanguageComponent } from './layout/topnav/language/language.component';
import {MatListModule} from "@angular/material/list";
import {RouterModule} from "@angular/router";
import {AgmCoreModule} from "@agm/core";
import {MatCardModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule} from "@angular/material";
import {ChartsModule, ChartsModule as Ng2Charts} from 'ng2-charts';

@NgModule({
    declarations: [TopnavComponent, SidebarComponent, LanguageComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        TranslateModule,
        MatListModule,
        AgmCoreModule,
        MatCardModule,
        ChartsModule,
        Ng2Charts,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSelectModule
    ],
    exports: [
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        TopnavComponent,
        SidebarComponent,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        TranslateModule,
        MatListModule,
        AgmCoreModule,
        MatCardModule,
        ChartsModule,
        Ng2Charts,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSelectModule
    ]
})

export class SharedModule {
}
