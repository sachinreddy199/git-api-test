import { Injectable, Injector } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { APP_CONFIG, AppConfig } from '../app.config';

@Injectable()
export class GitHubService {
    gitAPIUserBaseUrl: string = "";
    appConfig: AppConfig;
    requestOptions: RequestOptions;
    
    constructor(private _http: Http, private injector: Injector) {
        this.appConfig = injector.get(APP_CONFIG);
        this.gitAPIUserBaseUrl = this.appConfig['git_user_api_url'];

        let myheaders: Headers = new Headers();
        myheaders.set('Content-Type', 'application/json');
        myheaders.append('Authorization', 'token ' + this.appConfig['git_token']);
        this.requestOptions = new RequestOptions({ headers: myheaders });
    }

    getUser(username) {
        return this._http.get(this.gitAPIUserBaseUrl + username)
            .map(res => res.json());
    }

    getFollowers(username, max_followers) {
        return this._http.get(this.gitAPIUserBaseUrl + username + "/followers?per_page=" + max_followers, this.requestOptions)
            .map(res => res.json());
    }

}