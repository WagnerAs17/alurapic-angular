import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';


import {UserService} from '../../../core/user/user.service';

@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit{

    currentDisplay: string;

    constructor
    (
        private elemente: ElementRef<any>,
        private render: Renderer2,
        private userService: UserService
    ){}


    ngOnInit(): void {

        this.currentDisplay = getComputedStyle(this.elemente.nativeElement).display;
        this.userService.getUser().subscribe(user => {
            if(user){
                this.render.setStyle(this.elemente.nativeElement, 'display', this.currentDisplay);
            }else{
                this.currentDisplay = getComputedStyle(this.elemente.nativeElement).display;
                this.render.setStyle(this.elemente.nativeElement, 'display', 'none');

            }
        })
    }
}