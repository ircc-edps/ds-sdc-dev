import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { IDropdownInputConfig } from 'ircc-ds-angular-component-library';
import { IAutoTestComponentConfig, IAutoTestConfigObject } from '../auto-tester/auto-tester.component';
@Component({
  selector: 'app-mahsa',
  templateUrl: './mahsa.component.html',
  styleUrls: ['./mahsa.component.scss']
})
export class MahsaComponent implements OnInit {
  form = new FormGroup({});

  SELECT_ID = 'qa_test_select';

  qaSelect: IDropdownInputConfig = {
    id: this.SELECT_ID,
    formGroup: this.form,
    options: [
      { text: 'Option 1'},
      { text: 'Option 2'},
    ],
  };

  testerConfig: IAutoTestConfigObject = {
    dropdowns: [
      {
        id: 'category', //should be same as config property that we target
        formGroup: this.form,
        label: 'Category',
        options: [
          {
            text: 'secondary'
          },
          {
            text: 'primary'
          },
          {
            text: 'plain'
          }
        ],
      },
      {
        id: 'smallErrorMessages',
        formGroup: this.form,
        label: 'Small Error',
        errorMessages: [
          { key:'maxlength' , errorLOV:'Error message' }, 
          { key: 'testingError', errorLOV: 'Testing error message thing take 1000' }
        ],
        options: [
          { text: 'Maxlength' }, 
          { text: 'TestingError' }, 
          { text: 'Both Errors' }
        ],
        size: 'small'
      },
      {
        id: 'largeErrorMessages',
        formGroup: this.form,
        label: 'Large Error',
        errorMessages: [
          { key:'maxlength' , errorLOV:'Error message' }, 
          { key: 'testingError', errorLOV: 'Testing error message thing take 1000' }
        ],
        options: [
          { text: 'Maxlength' }, 
          { text: 'TestingError' }, 
          { text: 'Both Errors' }
        ],
        size: 'large'
      },
      {
        id: 'size',
        formGroup: this.form,
        label: 'Size',
        options: [
          { text: 'large' },
          { text: 'small' }
        ]
      }
    ],
    checkboxes: [
      {
        id: 'required',
        formGroup: this.form,
        inlineLabel: 'Required/Optional',
      },
    ],
    inputs: [
      {
        id: 'label',
        formGroup: this.form,
        label: 'Label'
      },
      {
        id: 'desc',
        formGroup: this.form,
        label: 'Description'
      },
      {
        id: 'hint',
        formGroup: this.form,
        label: 'Hint'
      },
    ]
  };

  autoTestConfig: IAutoTestComponentConfig = {
    id: 'mahsa_tester',
    formGroup: this.form,
    testFields: this.testerConfig
  }

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('mahsa-alt');

    this.testerConfig.dropdowns?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });
    this.testerConfig.checkboxes?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });
    this.testerConfig.inputs?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });
    this.form.addControl(this.qaSelect.id, new FormControl());

    this.form.valueChanges.subscribe(value => {
      let updatedConfig: IDropdownInputConfig = {
        id: this.SELECT_ID,
        formGroup: this.form
      };

      for(let param in value) {
        updatedConfig = { ...updatedConfig, [param]: value[param] }
        this.qaSelect = updatedConfig;
      }
    });
  }

  disable() {
    this.qaSelect?.formGroup.get(this.qaSelect.id)?.disabled ?
    this.qaSelect?.formGroup.get(this.qaSelect.id)?.enable() :
    this.qaSelect?.formGroup.get(this.qaSelect.id)?.disable();
  }

  setSamllError() {
    if (this.qaSelect?.formGroup.get('smallErrorMessages')?.value === 'Maxlength')  {
      this.qaSelect?.formGroup.get('smallErrorMessages')?.setErrors({'maxlength': { requiredLength: 3, actualLength: 5 }});
    } else if (this.qaSelect?.formGroup.get('smallErrorMessages')?.value === 'TestingError') {
      this.qaSelect?.formGroup.get('smallErrorMessages')?.setErrors({'testingError': true});
    } else {
      this.qaSelect?.formGroup.get('smallErrorMessages')?.
      setErrors({'testingError': true, 'maxlength': { requiredLength: 3, actualLength: 5 }});
    }
  };
  setLargeError() {
    if (this.qaSelect?.formGroup.get('largeErrorMessages')?.value === 'Maxlength')  {
      this.qaSelect?.formGroup.get('largeErrorMessages')?.setErrors({'maxlength': { requiredLength: 3, actualLength: 5 }});
    } else if (this.qaSelect?.formGroup.get('largeErrorMessages')?.value === 'TestingError') {
      this.qaSelect?.formGroup.get('largeErrorMessages')?.setErrors({'testingError': true});
    } else {
      this.qaSelect?.formGroup.get('largeErrorMessages')?.
      setErrors({'testingError': true, 'maxlength': { requiredLength: 3, actualLength: 5 }});
    }
  };
  resetError() {
    this.qaSelect?.formGroup.get('smallErrorMessages')?.reset();
    this.qaSelect?.formGroup.get('largeErrorMessages')?.reset();
  };
}
