import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { FormGroup, FormControl, ValidatorFn, Validators} from '@angular/forms';
import { IAutoTestComponentConfig, IAutoTestConfigObject } from '../auto-tester/auto-tester.component';
import { IBannerConfig } from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-mike',
  templateUrl: './mike.component.html',
  styleUrls: ['./mike.component.scss']
})
export class MikeComponent implements OnInit {

  BANNER_ID = 'qa_test_banner';

  qaBanner : IBannerConfig = {
    id: this.BANNER_ID
  };

  form = new FormGroup({});

  testerConfig: IAutoTestConfigObject = {
    inputs: [
      {
        id: 'title',
        formGroup: this.form,
        label: 'title'
      },
      {
        id: 'content',
        formGroup: this.form,
        label: 'content'
      }
    ],
    checkboxes: [
        {
          id: 'rounded',
          formGroup: this.form,
          label: 'rounded'
        },
        {
          id: 'dismissible',
          formGroup: this.form,
          label: 'dismissible'
        },
        {
          id: 'errorMessages',
          formGroup: this.form,
          label: 'error',
          errorMessages: [
            { key:'required' , errorLOV:'Required Error message' }
          ],
        }
    ],
    dropdowns: [
      {
        id: 'type',
        label: 'Type',
        formGroup: this.form,
        options: [
          {
            text: 'generic'
          },
          {
            text: 'info'
          },
          {
            text: 'warning'
          },
          {
            text: 'critical'
          },
          {
            text: 'success'
          }
        ]
      }
    ]
  }

  testComponentConfig: IAutoTestComponentConfig = {
    id: 'mike_tester',
    formGroup: this.form,
    testFields: this.testerConfig
  }

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('mike-alt');

    this.testerConfig.dropdowns?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });
    this.testerConfig.checkboxes?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });
    this.testerConfig.inputs?.forEach(i => {
      this.form.addControl(i.id, new FormControl());
    });

    this.form.valueChanges.subscribe(x => {
      let updatedConfig : IBannerConfig = {
        id: this.BANNER_ID
      };

      for(let param in x){
        updatedConfig = {...updatedConfig, [param] : x[param]}
        this.qaBanner = updatedConfig;
      }
    });
  }
  setResetError() {
    this.form.get('errorMessages')?.valid ?
      this.form.get('errorMessages')?.setErrors({ 'required': true }) :
      this.form.get('errorMessages')?.reset();
  }
}
