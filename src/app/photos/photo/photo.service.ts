import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

import {Photo} from './photo';
import {PhotoComment} from './photo-comment'
import {environment} from '../../../environments/environment';


const API = environment.API_URL;

//Para indicar que será injetado pelo construtor de quem for usar 
@Injectable({providedIn: 'root'})
export class PhotoService{
    
    constructor(private http: HttpClient){}

    listFromUser(userName:string) :Observable<Photo[]>{
        return this.http
            .get<Photo[]>(API + `${userName}/photos`);
    }

    listFromUserPaginated(userName:string, page: number) :Observable<Photo[]>{
        const params = new HttpParams().append('page', page.toString())
        return this.http
            .get<Photo[]>(API + `${userName}/photos`, {params});
    }

    upload(description: string, allowComments: boolean, file: File){
        const formData = new FormData();

        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true' : 'false');
        formData.append('imageFile', file);

        return this.http.post<Photo>(
            API + 'photos/upload', 
            formData, 
            {
                observe: 'events',
                reportProgress: true
            }
        );
    }

    findById(photoId: number): Observable<Photo>{
        return this.http.get<Photo>(API + "photos/" + photoId);
    }

    getComments(photoId: number): Observable<PhotoComment[]>{
        return this.http.get<PhotoComment[]>
            (API + 'photos/' + photoId + "/comments");
    } 

    addComments(photoId: number, commentText: string){
        return this.http.post(API + 'photos/' + photoId + "/comments", { commentText });
    }

    removePhoto(photoId: number){
        return this.http.delete(API + "photos/"+photoId);
    }

    like(photoId: number){
        return this.http
            .post(API + 'photos/' +photoId+ "/like", {}, {observe : 'response'})
            .pipe(map(res => true))
            .pipe(catchError(err => {
                return err.status === '304' ? of(false) : throwError(err);
            }));
    }
}