import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatInputModule, MatFormFieldModule, MatListModule, MatCardModule, MatMenuModule  } from '@angular/material';

import { AppComponent } from './app.component';
import { GitHubComponent } from './github/github.component';
import { GitHubService } from './service/github.service';
export const routes = [

    {
        path: 'githubAPIs',
        component: GitHubComponent
    }
]


@NgModule({
  declarations: [
    AppComponent,
      GitHubComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      HttpModule,
      RouterModule.forRoot(routes, { enableTracing: false }),
      MatButtonModule, MatInputModule, MatFormFieldModule, MatListModule, MatCardModule, MatMenuModule
  ],
  providers: [GitHubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
