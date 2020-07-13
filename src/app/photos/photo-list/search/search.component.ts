import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
    selector: 'app-search',
    templateUrl: 'search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
    
    debounce: Subject<string> = new Subject<string>();
    @Output() onTyping: EventEmitter<string> = new EventEmitter<string>();
    @Input() value:string = '';

    ngOnInit(): void {
        this.debounce
            .pipe(debounceTime(300))
            .subscribe(filter => this.onTyping.emit(filter));
    }

    //Faz parte do ciclo de vida do componente
    //Toda vez que sair de um componente ele vai chamar esse método
    //o debounce faz o subscribe e fica ouvindo até o infinito, ou até que seja seja chamado
    //o método complete() - Porém não sabemos quando o usuário vai terminar, então na saída, 
    //desse componente realizamos a chamada no unsubscribe() para parar de escutar o método
    ngOnDestroy(): void {
        this.debounce.unsubscribe();
    }

}