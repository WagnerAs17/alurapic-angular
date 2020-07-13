import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { PlatformDetectorService } from '../../core/plataform-detector/plataform-detector.service';
import { AuthService } from '../../core/auth/auth.service';
import { Title } from '@angular/platform-browser';
@Component({
    templateUrl: './signin.component.html'
})

export class SignInComponent implements OnInit {

    //FormGroup vai controlar o meu formulario
    //To fazendo o data binding
    loginForm: FormGroup;
    fromUrl: string;

    @ViewChild('userNameInput', { static: true }) userNameInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService,
        private activatedRoute: ActivatedRoute
    ) { }


    ngOnInit(): void {
        this.activatedRoute
            .queryParams
            .subscribe(params => {
                this.fromUrl = params['fromUrl'];
            });

        this.loginForm = this.formBuilder.group({
            //Primeiro parametro é o valor
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.platformDetectorService.isPlatformBrowser() &&
            this.userNameInput.nativeElement.focus();

    }

    login() {

        const userName: string = this.loginForm.get('userName').value;
        const password: string = this.loginForm.get('password').value;

        this.authService.authenticate(userName, password)
            .subscribe(() => {
                this.fromUrl ? 
                    this.router.navigateByUrl(this.fromUrl) : 
                    this.router.navigate(['user', userName]);
            },
            err => {
                alert('User or password invalid')
                console.log(err);
                this.loginForm.reset();
                this.platformDetectorService.isPlatformBrowser() &&
                this.userNameInput.nativeElement.focus();
            });
    }
}