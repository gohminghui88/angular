import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { Feedback, ContactType } from '../shared/feedback';

@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular,
              private processHTTPMsg: ProcessHttpmsgService) { }

			  
	submitFeedback(data: any): any {
		this.restangular.all('feedback').post(data);
		return data;
		//return this.restangular.one('feedback',id).get();
	}

}
