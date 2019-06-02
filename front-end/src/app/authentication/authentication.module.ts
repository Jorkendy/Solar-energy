import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthenticationRoutingModule} from './authentication-routing.module';
import {AuthenticationComponent} from './authentication.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
    declarations: [
        AuthenticationComponent,
        SignInComponent,
        SignUpComponent
    ],
    imports: [
        CommonModule,
        AuthenticationRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class AuthenticationModule {
}
