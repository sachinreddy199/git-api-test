import { InjectionToken } from '@angular/core';

export class AppConfig {
    env: string;
    git_token: string;
    git_user_api_url: string;
    title: string;
}

export const APP_CONFIG_VALUES: AppConfig = {
  env: 'dev',
  git_token: '8f6c660de26f5c746f0a45cafcedad1fbcd1b9b0',
	git_user_api_url: 'https://api.github.com/users/',
	title:'Sachin Test'
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');