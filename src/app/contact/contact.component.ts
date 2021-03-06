import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Feedback, ContactType } from '../shared/feedback';


import { FeedbackService } from '../services/feedback.service';

import { visibility } from '../animations/app.animation';
import { flyInOut, expand } from '../animations/app.animation';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'], 
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
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  returnFeedback: Feedback;
  contactType = ContactType;
  showform: string;
  
  constructor(private fb: FormBuilder, @Inject('BaseURL') private BaseURL, private feedbackService: FeedbackService) { this.createForm(); }

  ngOnInit() {
	  this.showform = "yes";
  }
  
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };
  
   createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });
	
	this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit() {
	this.showform="";
    this.feedback = this.feedbackForm.value;
    this.returnFeedback = this.feedbackService.submitFeedback(this.feedback); //if use subscribe, I got to post and then get again....
	//this.feedbackService.submitFeedback(this.feedback).subscribe(data => this.returnFeedback = data);
	
	console.log(this.returnFeedback);
	
	
	setTimeout(()=>{    
      this.returnFeedback = null;
	  this.showform="yes";
	  console.log("waited 5 seconds");
	},5000);
	
	
	this.feedbackForm.reset({
			firstname: '',
			lastname: '',
			telnum: '',
			email: '',
			agree: false,
			contacttype: 'None',
			message: ''
		});
	
    
  }
  
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
