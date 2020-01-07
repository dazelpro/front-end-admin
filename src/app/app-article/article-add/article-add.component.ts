import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppRestApiService } from 'src/app/app-rest-api.service';
import { AppUserService } from 'src/app/app-user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

import Quill from 'quill'
import BlotFormatter from "quill-blot-formatter";

Quill.register("modules/blotFormatter", BlotFormatter);

@Component({
    selector: 'app-article-add',
    templateUrl: './article-add.component.html',
    styleUrls: ['./article-add.component.css']
})
export class ArticleAddComponent implements OnInit {

    modules = {};

    data: any={};
    dataCategory: [];
    linkBackEnd ="";

    title       = "";
    content     = "";
    category    = "";
    description = "";
    keyword     = "";

    selectedFile: File = null;
    imgSt = false;
    imageName: string;

    checked: boolean;
    statusPost: string;

    downloadURL: Observable<string>;
    uploadProgress: Observable<number>;
    
    constructor(
        private rest: AppRestApiService,
        public dataUsr: AppUserService,
        private _snackBar: MatSnackBar,
        private router : Router,
        private storage: AngularFireStorage,
    ) { 
        this.dataUsr.getProfile();
        this.modules = {
            blotFormatter: {}
        };
        this.checked = true;
        this.statusPost = 'Public';
    }

    async ngOnInit() {
        await this.rest.category_all().subscribe((data) => {
            this.data = data['item'];
            data['success']
                ? (this.dataCategory = data['data'])
                : this.data.error(data['message']
            );
        })
    }

    changeStatus() {
        if(this.checked === true){
            this.statusPost = 'Public';
        } else {
            this.statusPost = 'Private';
        }
    }

    uploadFile(event) {
        const file = event.target.files[0];
        this.imageName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const fileRef = this.storage.ref(this.imageName);
        const task = this.storage.upload(this.imageName, file);

        // Ambil nilai perubahan persentasi upload
        this.uploadProgress = task.percentageChanges();
        // Ambil notifikasi ketika upload selesai
        task.snapshotChanges().pipe(
            finalize(() => this.downloadURL = fileRef.getDownloadURL() )
        )
        .subscribe()
    }

    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];
        if (this.selectedFile !== undefined){
            this.imgSt = true;
            this.uploadFile(event);
        } else {
            this.imgSt = false;
        }
    }

    async postingArticle() {
        if (this.title !== '' && this.category !== '' && this.content !== '' && this.dataUsr['idUser'] !== undefined && this.description !== '' && this.keyword !== '') {
            try {
                await this.rest.posting_article({
                    title: this.title,
                    category: this.category,
                    content: this.content,
                    description: this.description,
                    keyword: this.keyword,
                    postby: this.dataUsr['idUser'],
                    filename: this.imageName,
                    status: this.checked
                },
                ).subscribe(async (data)=>{
                    if (data['success']) {
                        this.router.navigate(['/2105/article']);
                }
                },(err)=>{
                    console.log(err);
                }); 
            } catch (error) {
                console.log(error);
            } 
        } else {
            this._snackBar.open('Error: Field has incomplete', 'Yes', {
                duration: 8000,
            });
        }
    }

    // async postingArticle() {
    //     if (this.imgSt !== false && this.title !== '' && this.category !== '' && this.content !== '' && this.dataUsr['idUser'] !== undefined) {
    //         let FrmData = new FormData();
    //         FrmData.append('image', this.selectedFile, this.selectedFile.name);
    //         FrmData.append('title', this.title);
    //         FrmData.append('category', this.category);
    //         FrmData.append('content', this.content);
    //         FrmData.append('postby', this.dataUsr['idUser']);
    //         try {
    //             await this.rest.posting_article(FrmData).subscribe(async (data)=>{
    //                 if (data['success']) {
    //                     this.router.navigate(['/2105/article']);
    //                 }
    //             },(err)=>{
    //                 console.log(err);
    //             }); 
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     } else {
    //         this._snackBar.open('Error: Field has incomplete', 'Yes', {
    //             duration: 8000,
    //         });
    //     }
        
    // }

}
