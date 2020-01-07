import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppRestApiService } from 'src/app/app-rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

import Quill from 'quill'
import BlotFormatter from "quill-blot-formatter";

Quill.register("modules/blotFormatter", BlotFormatter);

@Component({
    selector: 'app-article-edit',
    templateUrl: './article-edit.component.html',
    styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {

    modules = {};

    id: string;
    data: any={};
    DataArticle: any=[];

    title: string;
    content: string;
    linkImage: string;
    description: string;
    keyword: string;

    checked: boolean;
    statusPost: string;

    selectedFile: File = null;
    imgSt = false;
    imageName: string;
    downloadURL: Observable<string>;
    uploadProgress: Observable<number>;
    
    constructor(
        private rest: AppRestApiService,
        private router : Router,
        private activatedRoute: ActivatedRoute,
        private storage: AngularFireStorage,
    ) { 
        this.id = activatedRoute.snapshot.url[2]["path"];
        this.modules = {
            blotFormatter: {}
        };
        this.checked = true;
        this.statusPost = 'Public';
    }

    async ngOnInit() {
        await this.rest.get_edit_article(this.id).subscribe((data) => {
            this.data = data['item'];
            data['success']
                ? (this.DataArticle = data['data'][0])
                : this.data.error(data['message']
            );
            this.title = this.DataArticle['article_title'];
            this.content = this.DataArticle['article_content'];
            this.description = this.DataArticle['article_description'];
            this.keyword = this.DataArticle['article_keyword'];
            this.imageName = this.DataArticle['article_images'];
            this.linkImage = 'https://firebasestorage.googleapis.com/v0/b/zel-blog.appspot.com/o/'+this.DataArticle['article_images'];
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
            this.imageName = this.DataArticle['article_images'];
        }
    }

    async editArticle() {
        try {
            await this.rest.edit_article({
                id: this.id,
                title: this.title,
                content: this.content,
                description: this.description,
                keyword: this.keyword,
                filename: this.imageName,
                status: this.checked
            },
            ).subscribe(async (data)=>{
                if (data['success']) {
                    this.router.navigate(['/article']);
            }
            },(err)=>{
                console.log(err);
            }); 
        } catch (error) {
            console.log(error);
        }
    }

}
