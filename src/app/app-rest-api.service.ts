import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppRestApiService {

    constructor(
        private http: HttpClient
    ) { }

    getHeaders() {
        const token = localStorage.getItem('auth-goblog');
        return token ? new HttpHeaders().set('Authorization', token) : null;
    }

    get(link: string) {
        return this.http.get(link, { headers: this.getHeaders() }).toPromise();
    }

    post(link: string, body: any) {
        return this.http.post(link, body, { headers: this.getHeaders() }).toPromise();
    }

    link_url(){
        // return 'http://localhost:8080';
        return 'https://admin.dazelpro.xyz';
        // return 'https://mean-back-end-v1.herokuapp.com';
    }

    link_Frontend(){
        // return 'http://localhost:4400';
        // return 'http://localhost:4300';
        return 'https://dazelpro.my.id';
    }

    // Login
    user_login(data) {
        return this.http.post(`${this.link_url()}/api-login`,data,{ headers: this.getHeaders() });
    }

    user_getProfile(){
        return this.http.get(`${this.link_url()}/api-account`,{ headers: this.getHeaders() });
    }

    // Category
    category_all(){
        return this.http.get(`${this.link_url()}/api-category/show-category`,{ headers: this.getHeaders() });
    }

    save_category(data) {
        return this.http.post(`${this.link_url()}/api-category/add-category`,data,{ headers: this.getHeaders() });
    }

    update_category(data) {
        return this.http.post(`${this.link_url()}/api-category/update-category`,data,{ headers: this.getHeaders() });
    }

    delete_category(data) {
        return this.http.post(`${this.link_url()}/api-category/delete-category`,data,{ headers: this.getHeaders() });
    }

    // Users
    users_all(){
        return this.http.get(`${this.link_url()}/api-users/show-user`,{ headers: this.getHeaders() });
    }

    save_user(data) {
        return this.http.post(`${this.link_url()}/api-users/add-user`,data,{ headers: this.getHeaders() });
    }

    // Settings
    get_setting_site(data){
        return this.http.get(`${this.link_url()}/api-settings/show-setting-site/`+data,{ headers: this.getHeaders() });
    }

    update_site_setting(data) {
        return this.http.post(`${this.link_url()}/api-settings/update-setting-site`,data,{ headers: this.getHeaders() });
    }

    // Article
    article_all(){
        return this.http.get(`${this.link_url()}/api-article/show-article-all`,{ headers: this.getHeaders() });
    }

    posting_article_with_image(data) {
        return this.http.post(`${this.link_url()}/api-article/post-article-image`,data,{ headers: this.getHeaders() });
    }

    posting_article(data) {
        return this.http.post(`${this.link_url()}/api-article/post-article`,data,{ headers: this.getHeaders() });
    }

    get_edit_article(data){
        return this.http.get(`${this.link_url()}/api-article/show-article-detail/`+data,{ headers: this.getHeaders() });
    }

    edit_article_with_image(data) {
        return this.http.post(`${this.link_url()}/api-article/edit-article-image`,data,{ headers: this.getHeaders() });
    }

    edit_article(data) {
        return this.http.post(`${this.link_url()}/api-article/edit-article`,data,{ headers: this.getHeaders() });
    }

    delete_article(data) {
        return this.http.post(`${this.link_url()}/api-article/delete-article`,data,{ headers: this.getHeaders() });
    }
}
