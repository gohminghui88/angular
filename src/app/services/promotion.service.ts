import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


import 'rxjs/add/operator/delay';

@Injectable()
export class PromotionService {

  constructor() { }

  /*
  getPromotions(): Promise<Promotion[]> {
	  
    return new Promise(resolve => {
		setTimeout(() => resolve(PROMOTIONS), 2000);
	});
  }

  getPromotion(id: number): Promise<Promotion> {
    return new Promise(resolve => {
		setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000);
	});
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise(resolve => {
		setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
		
	});
  }
  */
  
  getPromotions(): Observable<Promotion[]> {
    return Observable.of(PROMOTIONS).delay(2000);
  }

  getPromotion(id: number): Observable<Promotion> {
    return Observable.of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).delay(2000);
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return Observable.of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).delay(2000);
  }
}