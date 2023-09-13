import { Component, OnInit } from '@angular/core';
import { TranslatedPageComponent } from '@app/pages/translated-page-component';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import {
  IBannerConfig,
  ICheckBoxComponentConfig,
  IInputComponentConfig,
  IRadioInputComponentConfig,
  ITabNavConfig
} from 'ircc-ds-angular-component-library';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ICodeViewerConfig,
  stringify
} from '@app/components/code-viewer/code-viewer.component';
import { TranslateService } from '@app/share/templates/parent-template.module';

/**
 * Interactive input demo & code block
 */
@Component({
  selector: 'app-input-doc-code',
  templateUrl: './input-doc-code.component.html',
  styleUrls: ['./input-doc-code.component.scss']
})
export class InputDocCodeComponent implements OnInit, TranslatedPageComponent {
  altLangLink = 'input';
  formInput: FormGroup = new FormGroup({});
  state: boolean = false;

  constructor(
    private lang: LangSwitchService,
    private translate: TranslateService
  ) {}

  inputConfig: IInputComponentConfig = {
    id: 'input',
    formGroup: this.formInput,
    size: 'small',
    type: 'text',
    required: false,
    label: 'Label Text',
    desc: 'Description line of text',
    errorMessages:[
      { key: 'required', errorLOV: this.translate.instant('ERROR.singleError') },
      { key: 'email', errorLOV: this.translate.instant('ERROR.additionalError') },
      { key: 'email2', errorLOV: this.translate.instant('ERROR.additionalError') }
    ]
  };

  inputConfigRequired: boolean = false;

  toggles: IRadioInputComponentConfig[] = [
    {
      id: 'size',
      formGroup: this.formInput,
      size: 'small',
      label: 'General.Size',
      options: [
        {
          text: 'General.Small',
          value: 'Small'
        },
        {
          text: 'General.Large',
          value: 'Large'
        }
      ]
    },
    {
      id: 'hint',
      formGroup: this.formInput,
      size: 'small',
      label: 'General.Hint',
      options: [
        {
          text: 'General.TrueLabel',
          value: 'True'
        },
        {
          text: 'General.FalseLabel',
          value: 'False'
        }
      ]
    },
    {
      id: 'required',
      formGroup: this.formInput,
      size: 'small',
      label: 'General.Required',
      options: [
        {
          text: 'True'
        },
        {
          text: 'False'
        }
      ]
    },
    {
      id: 'error',
      formGroup: this.formInput,
      size: 'small',
      label: 'ERROR.errorMessage',
      options: [
        {
          text: 'General.NoneErr',
          value: 'None'
        },
        {
          text: 'General.SingleErr',
          value: 'Single'
        },
        {
          text: 'General.MultipleErr',
          value: 'Multiple'
        }
      ]
    },
    {
      id: 'desc',
      formGroup: this.formInput,
      size: 'small',
      label: 'General.Description',
      options: [
        {
          text: 'General.TrueLabel',
          value: 'True'
        },
        {
          text: 'General.FalseLabel',
          value: 'False'
        }
      ]
    },
    {
      id: 'placeholder',
      formGroup: this.formInput,
      size: 'small',
      label: 'General.Placeholder',
      options: [
        {
          text: 'General.TrueLabel',
          value: 'True'
        },
        {
          text: 'General.FalseLabel',
          value: 'False'
        }
      ]
    }
  ];

  checkboxes: ICheckBoxComponentConfig[] = [
    {
      id: 'state',
      formGroup: this.formInput,
      size: 'small',
      label: 'General.StateLabel',
      inlineLabel: 'General.DisabledLabel'
    }
  ];

  demoTabsConfig: ITabNavConfig = {
    id: 'demoTabs',
    size: 'small',
    tab: [
      {
        id: 'basic',
        title: 'General.Basic'
      },
      {
        id: 'password',
        title: 'General.Password'
      }
    ]
  };

  bannerConfig: IBannerConfig = {
    id: 'banner-disabled-desc',
    type: 'info',
    size: 'small',
    title: 'General.EnabledBannerTitle',
    content: 'General.EnabledBannerContent',
    rounded: true
  };

  inputConfigCodeView: any = {
    id: this.inputConfig.id,
    formGroup: `new FormGroup({})`,
    type: this.inputConfig.type,
    required: this.inputConfig.required,
    size: this.inputConfig.size,
    label: this.inputConfig.label,
    desc: this.inputConfig.desc,
    hint: this.inputConfig.hint,
    placeholder: this.inputConfig.placeholder,
    errorMessages: undefined
  };

  codeViewConfig: ICodeViewerConfig = {
    id: 'input-code-viewer',
    openAccordion: true,
    selected: 'html',
    tab: [
      {
        id: 'html',
        title: 'HTML',
        value: `<ircc-cl-lib-input [config]="inputConfig"></ircc-cl-lib-input>`
      },
      {
        id: 'ts',
        title: 'TypeScript',
        value:
          "import { IInputComponentConfig } from 'ircc-ds-angular-component-library';\r" +
          "import { FormGroup } from '@angular/forms';\n\n" +
          `inputConfig: IInputComponentConfig = ${stringify(
            this.inputConfigCodeView
          )}
          `
      }
    ]
  };


  setInputType(value: string) {
    // If set type to password, automatically select placeholder to False
    if (value == 'password')
      this.formInput.patchValue({
        placeholder: 'False'
      });

    this.inputConfig = {
      ...this.inputConfig,
      label:
        value == 'password'
          ? this.parseRequiredLabel('Password', this.inputConfigRequired)
          : this.parseRequiredLabel('Label Text', this.inputConfigRequired),
      type: value == 'password' ? 'password' : 'text'
    };
  }

  listOfConfigItems = ['size', 'required', 'label', 'desc', 'hint', 'error', 'state']

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);

    this.formInput.addControl(this.inputConfig.id, new FormControl());

    this.toggles.forEach((toggle) => {
      if (toggle.options && toggle.options[1].text) {
        this.formInput.addControl(
          toggle.id,
          new FormControl(toggle.options[1].text)
        );
      }
    });

    this.checkboxes.forEach((checkbox) => {
      this.formInput.addControl(checkbox.id, new FormControl());
    });

    this.formInput
      .get(this.checkboxes[0].id)
      ?.valueChanges.subscribe((change) => {
        if (change) {
          this.bannerConfig.title = 'General.DisabledBannerTitle';
          this.bannerConfig.content = 'General.DisabledBannerContent';
        } else {
          this.bannerConfig.title = 'General.EnabledBannerTitle';
          this.bannerConfig.content = 'General.EnabledBannerContent';
        }
      });

    this.formInput.patchValue({
      size: 'Small',
      hint: 'False',
      desc: 'True',
      placeholder: 'False',
      error: 'None'
    });

    this.listOfConfigItems.forEach((configItem) => {
      this.formInput.get(configItem)?.valueChanges.subscribe((value : any) => {
        this.parseConfigSingleCheckbox(configItem, value)
      });
    })

  }

  private parseConfigSingleCheckbox (type : string, value : any) {
    switch (type) {
      case 'size':
        this.inputConfig = {
          ...this.inputConfig,
          size: value.toLowerCase(),
        };
        break;
      case 'required':
        this.inputConfig = {
          ...this.inputConfig,
          required: value === 'True',
        };
        break;
      case 'label':
        this.inputConfig = {
          ...this.inputConfig,
          label: value === 'True' ? 'Label Text' : undefined,

        };
        break;
      case 'desc':
        this.inputConfig = {
          ...this.inputConfig,
          desc: value === 'True' ? 'Description line of text' : undefined,
        };
        break;
      case 'hint':
        this.inputConfig = {
          ...this.inputConfig,
          hint: value === 'True' ? 'Hint Text' : undefined,
        };
        break;
      case 'error':
        this.determineErrorState(value, this.formInput, this.inputConfig.id)
        break;
      case 'state':
        console.log("State", value)
        // if(value !== undefined) {
        //   console.log("Disable")
        //   this.toggleDisabled(value, this.inputConfig.id, this.formInput);
        // }
        break;
      default: 
        console.log("Hit default case")
    }
  }

  

  determineErrorState(value: string, formGroup: FormGroup, formID: string) {
    let errorArray: string[] = [];
    switch (value) {
      case 'Single':
        errorArray = ['required']
        console.log("single Error")
        // errorArray.push(errors[0]);
        this.setErrors(formGroup, formID, errorArray)
        break;
      case 'Multiple':
        console.log("Mulit Error")
        errorArray = ['required', 'email', 'email2']
        this.setErrors(formGroup, formID, errorArray)
        break;
      case 'None':
        console.log("No Error")
        errorArray = []
        this.setErrors(formGroup, formID, errorArray)
        break;
    }
  }

  setErrors(formGroup: FormGroup, formID: string, errorKeys: string[]) {
    let errorVals = {};
    if (errorKeys.length === 0) {
      formGroup.get(formID)?.setErrors(null);
    } else {
      errorKeys.forEach(error => {
        errorVals[error] = true
      });
      formGroup.get(formID)?.setErrors(errorVals);
      formGroup.get(formID)?.markAsTouched();
    }
    console.log('for errors:', formGroup.get(formID)?.errors)
  }


  private parseRequiredLabel(
    label: string,
    required: string | boolean
  ): string {
    const requiredLabel = ' (required)';
    if (
      (required === 'True' || required === true) &&
      !label.includes(requiredLabel)
    ) {
      label += requiredLabel;
    }
    if (
      (required === 'False' || required === false) &&
      label.endsWith(requiredLabel)
    ) {
      label = label.substring(0, label.length - requiredLabel.length);
    }
    return label;
  }
}
