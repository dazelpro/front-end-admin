import { Component, OnInit, Inject } from '@angular/core';
import { AppRestApiService } from 'src/app/app-rest-api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-article-delete',
    templateUrl: './article-delete.component.html',
    styleUrls: ['./article-delete.component.css']
})
export class ArticleDeleteComponent implements OnInit {

    data: any={};
    constructor(
        public dialogRef: MatDialogRef<ArticleDeleteComponent>,
        private rest: AppRestApiService,
        @Inject(MAT_DIALOG_DATA) public id: object,
    ) { }

    ngOnInit() {
    }
    
    async deleteData() {
        await this.rest.delete_article({article_id: this.id}).subscribe((data) => {
            this.data = data['item'];
            data['success']
                ? this.dialogRef.close()
                : this.data.error(data['message']
            );
        })
    }

    onCancel() {
        this.dialogRef.close();
    }

}
