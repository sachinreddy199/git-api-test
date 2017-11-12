import { Component, OnInit } from '@angular/core';
import { GitHubService } from '../service/github.service';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GitHubComponent implements OnInit {
    githubUserName: string;
    followers = {};
    followersTree = {};
    globalGithubAPICallCount = 0;

    maxFollowers: number = 5;
    maxLevels: number = 3;

    errorMessage: string = '';

    constructor(private githubService: GitHubService) {

    }

    getGithubAccountFollowers(gitUser, level, githubUserFollowersTree) {
        this.errorMessage = '';
        let self = this;

        self.githubService.getFollowers(gitUser, this.maxFollowers).subscribe(followers => {
            /*TODO just to avoid max call timeout issues
            if(self.globalGithubAPICallCount > 200) {
                throw "exit";
            }*/
            if (level > self.maxLevels) {
                return;
            }
            
            followers.forEach(function (fol, index) {
                let followersFollowers = {};
                followersFollowers['gitUser'] = fol.login;
                followersFollowers['followers'] = [];
                
                githubUserFollowersTree['followers'].push(followersFollowers);
                self.globalGithubAPICallCount++;
                self.getGithubAccountFollowers.apply(self, [fol.login, level + 1, followersFollowers]);
            });
            level++;
            console.log('Number of followers for [' + gitUser + '] is [' + followers + ']');
            console.log('Followers:', JSON.stringify(githubUserFollowersTree));
            console.log('Deep count is [' + level + ']');
        }, err => {
            console.log('Error occured while calling API', err);
            if(err._body) {
                let m = JSON.parse(err._body);
                self.errorMessage = m.message;
            }
            
        });
        this.followers = JSON.stringify(this.followersTree, null, 4);
        console.log('Git followers', this.followers);
    }

    reset() {
        this.githubUserName = '';
        this.followers = {};
    }

    resetFollowers() {
        this.followersTree['gitUser'] = this.githubUserName;
        this.followersTree['followers'] = [];
    }

    ngOnInit() {
        this.followersTree['gitUser'] = this.githubUserName;
        this.followersTree['followers'] = [];
     }

}
