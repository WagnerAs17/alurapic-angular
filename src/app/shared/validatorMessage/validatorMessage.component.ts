import { Component, Input } from '@angular/core';


@Component({
    selector:'app-validatorMsg',
    templateUrl:'./validatorMessage.component.html'
})
export class ValidatorMessageComponent{
    @Input() text: string = '';
}