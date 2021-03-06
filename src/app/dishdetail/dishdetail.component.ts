//import { trigger, state, style, animate, transition } from '@angular/animations';

import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MdInputModule} from '@angular/material';

import { Comment } from '../shared/comment';

import { visibility } from '../animations/app.animation';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css'], 
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    visibility(), 
	flyInOut(), 
	expand()
  ]
})


export class DishdetailComponent implements OnInit {

	formsValue: any;
	commentForm: FormGroup;
	comment: Comment;
	dish: Dish;
	dishcopy = null;
	dishIds: number[];
	prev: number;
	next: number;
	dateObj: any; 
	errMess: string;
	visibility = 'shown';
	

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location, private fb: FormBuilder, @Inject('BaseURL') private BaseURL) { 
	
		this.createForm();
		
	}

  ngOnInit() {
    //let id = +this.route.snapshot.params['id'];
    //this.dishservice.getDish(id).subscribe(dish => this.dish = dish);
	this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); })
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
          errmess => { this.dish = null; this.errMess = <any>errmess; });
	
	
  }
  
  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }
  
  
  
  createForm() {
    this.commentForm = this.fb.group({
      author: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
	  date: '', 
	  rating: [5, Validators.compose([Validators.required])],
	  comment: ['', Validators.compose([Validators.required, Validators.minLength(2)])]
    });
	
	this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
	this.onValueChanged();
  }

  onSubmit(data: any) {
	  
	  this.comment = this.commentForm.value;
	  this.comment.date = new Date().toISOString();
	  
	  this.dishcopy.comments.push(this.comment);
      this.dishcopy.save()
      .subscribe(dish => { this.dish = dish; console.log(this.dish); });
	
	
	//this.dish.comments.push(data.value);
	
	console.log(this.comment);	
	
    this.commentForm.reset();
  }
  
  formErrors = {
	  'author': '', 
	  'comment': ''
  }
  
  validationMessages = {
	  'author': {
		  'required': 'author name cannot be empty', 
		  'minlength': 'author name must be at least 2 characters'
	  }, 
	  
	  'comment': {
		  'required': 'comment cannot be empty', 
		  'minlength': 'comment must be at least 2 characters'
	  }
  }
  
  onValueChanged(data?: any) {
	  if(!this.commentForm) {return ;}
	  const form = this.commentForm;
	  
	  for(const field in this.formErrors) {
		  this.formErrors[field] = '';
		  const control = form.get(field);
		  
		  if(control && control.dirty && !control.valid) {
			  const messages = this.validationMessages[field];
			  
			  for(const key in control.errors) {
				  this.formErrors[field] += messages[key] + ' ';
			  }
		  }
	  }
  }

}
