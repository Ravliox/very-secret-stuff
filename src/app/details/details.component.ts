import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})


export class DetailsComponent implements OnInit {
  @Input() detailsForm : FormGroup;

  constructor(private formBuilder : FormBuilder, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.buildForm();
    this.detailsForm.controls.creation_date.setValue(this.setCurrentDate());
  }

  buildForm() {
    this.detailsForm = this.formBuilder.group({  
      cif: '',
      account_no: ['', Validators.pattern('^[0-9]+$')],
      none: '',
      instance_id: '',
      creation_date: '',
      initiator: ''
    })
  }

  setCurrentDate() : String {
    return this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  getError(input : String):String {
    switch (input){
      case 'cif':
        return this.detailsForm.controls.cif.hasError('required') ? 'You must enter a value' : '';
      case 'account_no':
        return this.detailsForm.controls.account_no.hasError('required') ? 'You must enter a value' :
          this.detailsForm.controls.account_no.hasError('pattern') ? 'Must be a number' : '';
    }
  }


}
