import {Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

import {PhotoService} from '../../photo/photo.service';
import {PhotoComment} from '../../photo/photo-comment';


@Component({
    selector: 'app-comments' ,
    templateUrl: './photo-comments.component.html',
    styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit{

    comments$: Observable<PhotoComment[]>;

    commentForm: FormGroup;

    @Input() photoId: number;

    constructor
    (
        private photoService: PhotoService,
        private formBuilder: FormBuilder
    ){}


    ngOnInit(): void {
        console.log(this.photoId);
        this.comments$ = this.photoService.getComments(this.photoId);

        this.commentForm = this.formBuilder.group({
            comment: ['', Validators.maxLength(300)]
        })

        
    }

    save(){
        const comment  = this.commentForm.get('comment').value as string;
        this.comments$ = this.photoService
            .addComments(this.photoId, comment)
            .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
            .pipe(tap(() => {
                this.commentForm.reset();
            }));
    }

    
}