import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  uploadForm: FormGroup;
  file: File;
  preview: string;
  percenteDone = 0;


  constructor
  (
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.uploadForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', [Validators.maxLength(300), Validators.required]],
      allowComments: [true]
    })
  }

  upload(){
    const description:string = this.uploadForm.get('description').value;
    const allowComments: boolean = this.uploadForm.get('allowComments').value;

    this.photoService
      .upload(description, allowComments, this.file)
      .pipe(finalize(() => {
        this.router.navigate(['/user', this.userService.getUserName()]);
      }))
      .subscribe((event: HttpEvent<any>) => {
        if(event.type === HttpEventType.UploadProgress){
          this.percenteDone = Math.round(100 * event.loaded /event.total);
        }else if(event.type === HttpEventType.Response){
          this.alertService.success("Success upload", true);
        }
      }, 
      err => {
        console.log(err);
        this.alertService.danger('Upload error', true);
      });
  }

  handleFile(file:File){
    this.file = file;

    //File reader é JavaScript puro;
    const reader = new FileReader();

    reader.onload = (event: any) => this.preview =  event.target.result;
    reader.readAsDataURL(file);
    
  }

}
