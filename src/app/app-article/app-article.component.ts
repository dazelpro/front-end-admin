import { Component, OnInit } from '@angular/core';
import { AppRestApiService } from '../app-rest-api.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ArticleDeleteComponent } from './article-delete/article-delete.component';

@Component({
    selector: 'app-app-article',
    templateUrl: './app-article.component.html',
    styleUrls: ['./app-article.component.css']
})
export class AppArticleComponent implements OnInit {

    data: any={};
    dataArticle: [];
    p: number [] = [1];

    constructor(
        private rest: AppRestApiService,
        public dialog: MatDialog,
        private router : Router,
    ) { }

    async ngOnInit() {
        await this.rest.article_all().subscribe((data) => {
            this.data = data['item'];
            data['success']
                ? (this.dataArticle = data['data'])
                : this.data.error(data['message']
            );
        })
    }

    addArticle() {
        this.router.navigate(['/2105/article/new']);
    }

    editArticle() {
        console.log('tes2');
    }

    dialogDelete() {
        const dialogRef = this.dialog.open(ArticleDeleteComponent, {
            width: '450px',
            height: '220px'
        });
        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });
    }

}
