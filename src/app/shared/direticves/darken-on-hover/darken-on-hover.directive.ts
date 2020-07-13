import {Directive, ElementRef, HostListener, Renderer2, Input} from '@angular/core';

//para acessar o select como atributo deve colocar entre colchetes
@Directive({
    selector: '[appDarkenOnHover]'
})
export class DarkenOnHoverDirective{

    @Input() brightness:string = '70%';
    // O angular vai pegar o elemento do DOM onde essa diretiva está adicionada
    //Ele é uma "casquinha" sobre esse elmento do DOM -> É uma última proteção antes de acessar o 
    //elemento nativo do DOM
    constructor
    (
        private elemento: ElementRef,
        private render: Renderer2
    ){}

    //aplica o evento sobre o elemento do qual a diretiva está aplicada
    @HostListener('mouseover')
    darkenOn(){
        this.render.setStyle(this.elemento.nativeElement,'filter', `brightness(${this.brightness})`);
    }

    @HostListener('mouseleave')
    darkenOff(){
        this.render.setStyle(this.elemento.nativeElement,'filter', 'brightness(100%)');
    }
}