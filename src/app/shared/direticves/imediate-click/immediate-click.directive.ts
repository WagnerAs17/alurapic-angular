import {Directive, ElementRef, OnInit} from '@angular/core';

import {PlatformDetectorService} from '../../../core/plataform-detector/plataform-detector.service'

@Directive({
    selector: '[immediateClick]'
})
export class ImmediateClickDirective implements OnInit{

    constructor
    (
        private elementeRef: ElementRef<any>,
        private platFormDetector: PlatformDetectorService
    ){}

    ngOnInit(): void {
        this.platFormDetector.isPlatformBrowser && 
        this.elementeRef.nativeElement.click();
    }
}