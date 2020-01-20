import { Component, OnInit } from '@angular/core';
import { AppRestApiService } from '../app-rest-api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-app-setting',
    templateUrl: './app-setting.component.html',
    styleUrls: ['./app-setting.component.css']
})
export class AppSettingComponent implements OnInit {

    data: any={};
    dataSite: any=[];

    dataTitle:string;
    dataAuthor:string;
    dataDesc:string;
    dataKey:string;
    id = 1;
    constructor(
        private rest: AppRestApiService,
        private router : Router,
    ) { }

    async ngOnInit() {
        await this.rest.get_setting_site(this.id).subscribe((data) => {
            this.data = data['item'];
            data['success']
                ? (this.dataSite = data['data'][0])
                : this.data.error(data['message']
            );
            this.dataTitle = this.dataSite['site_title'];
            this.dataAuthor = this.dataSite['site_author'];
            this.dataDesc = this.dataSite['site_description'];
            this.dataKey = this.dataSite['site_keyword'];
        })
    }

    async updateData() {
        try {
            await this.rest.update_site_setting({
                site_title: this.dataTitle,
                site_description: this.dataDesc,
                site_keyword: this.dataKey,
                site_author: this.dataAuthor,
            },
            ).subscribe(async (data)=>{
                if (data['success']) {
                    this.router.navigate(['/dashboard']);
            }
            },(err)=>{
                console.log(err);
            }); 
        } catch (error) {
            console.log(error);
        }
    }

}
