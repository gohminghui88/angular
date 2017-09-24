import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

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


@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular,
              private processHTTPMsg: ProcessHttpmsgService) { }

  
  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.restangular.one('promotions', id).get();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('promotions').getList({featured: true})
			.map(promotions => promotions[0]);
  }
  
  getPromotionsIds(): Observable<number[]> {
    return this.getPromotions()
      .map(promotions => { return promotions.map(promotion => promotion.id) })
      .catch(error => { return error; } );
  }
}