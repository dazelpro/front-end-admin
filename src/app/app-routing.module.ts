import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';
import { AppCategoryComponent } from './app-category/app-category.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { AppAuthService } from './app-auth.service';
import { AppArticleComponent } from './app-article/app-article.component';
import { ArticleAddComponent } from './app-article/article-add/article-add.component';
import { ArticleEditComponent } from './app-article/article-edit/article-edit.component';
import { AppUserComponent } from './app-user/app-user.component';
import { AppSettingComponent } from './app-setting/app-setting.component';

const appRoutes: Routes = [
    {
        path: 'login',
        component:  AppLoginComponent },
    {   
        path: 'dashboard',
        component:  AppDashboardComponent,
        canActivate: [AppAuthService]
    },
    {   
        path: 'category',
        component:  AppCategoryComponent,
        canActivate: [AppAuthService]
    },
    {   
        path: 'article',
        component:  AppArticleComponent,
        canActivate: [AppAuthService]
    },
    {   
        path: 'article/new',
        component:  ArticleAddComponent,
        canActivate: [AppAuthService]
    },
    {   
        path: 'article/edit/:id',
        component:  ArticleEditComponent,
        canActivate: [AppAuthService]
    },
    {   
        path: 'users',
        component:  AppUserComponent,
        canActivate: [AppAuthService]
    },
    {   
        path: 'settings',
        component:  AppSettingComponent,
        canActivate: [AppAuthService]
    },
    { 
        path: '**',
        redirectTo: 'dashboard'
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
