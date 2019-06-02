import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../core/services/authentication.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    signInForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _authService: AuthenticationService,
        private _router: Router
    ) {
        this.signInForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        })
    }

    ngOnInit() {
    }

    onSignIn() {
        if (this.signInForm.valid) {
            this._authService.attemptAuth(this.signInForm.value).subscribe(
                data => {
                    if (data.token) {
                        this._router.navigate(['']).then();
                    }
                },
                async error => {
                    console.error(error.error.message);
                })
        }
    }
}
