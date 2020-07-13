import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {LowerCaseValidator} from '../../shared/validators/lower-case.validator';
import {UserNotTakenValidatorService} from './user-not-taken.validator.service';
import {NewUser} from './new-user';
import { SingUpService } from './singup.service';
import { Router } from '@angular/router';
import {PlatformDetectorService} from '../../core/plataform-detector/plataform-detector.service';
import {userNamePasswordValidator} from './username-password.validator';


@Component({
    templateUrl: './singup.component.html',
    providers: [UserNotTakenValidatorService]
    //indicando o providers e passando o serviço indicamos que
    //só esse arquivo terá acesso   
})
export class SingUpComponent implements OnInit{

    singupGroup: FormGroup;
    @ViewChild('inputEmail', {static: true}) inputEmail: ElementRef<HTMLInputElement> ;

    constructor
    (
        private formBuilder: FormBuilder,
        private userNotTakenValidService: UserNotTakenValidatorService,
        private SignUpService: SingUpService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService
    ){}


    ngOnInit(): void {

       this.singupGroup = this.formBuilder.group({
           userName: ['', 
                [
                    Validators.required,
                    LowerCaseValidator,
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ],
                this.userNotTakenValidService.checkUserNameTaken()
            ],
           email: ['', 
                [
                    Validators.required,
                    Validators.email
                ]
            ],
           fullName: ['', 
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
           password: ['', 
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14)
                ]
            ]
       },{
           validators: userNamePasswordValidator
       });

       this.platformDetectorService.isPlatformBrowser() &&
       this.inputEmail.nativeElement.focus();
    }

    signUp(){

        if(this.singupGroup.valid && !this.singupGroup.pending){
            //getRawValue - retorna um objeto javaScript com todos os valor digitados pelo usuario
            const newUser = this.singupGroup.getRawValue() as NewUser;
            
            this.SignUpService
                .signUp(newUser)
                .subscribe(() => 
                    this.router.navigate(['']),
                    err => console.log(err)
                );
        }
    }
}