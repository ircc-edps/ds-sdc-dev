import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IInputComponentConfig } from 'ircc-ds-angular-component-library';

import {
  slugAnchorType,
  slugTitleURLConfig,
  slugTitleURLType
} from '@app/components/title-slug-url/title-slug-url.component';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { SlugifyPipe } from '@app/share/pipe-slugify.pipe';
import { ContentItem } from '@app/share/lan-switch/interface/content-item.interface';

@Component({
  selector: 'app-input-documentation',
  templateUrl: './input-documentation.component.html',
  styleUrls: ['./input-documentation.component.scss'],
  providers: [SlugifyPipe]
})
export class InputDocumentationComponent implements OnInit {
  currentLanguage: string = '';
  slugTitleURLType = slugTitleURLType;
  anchorType = slugAnchorType;

  altLangLink = 'inputDocumentation';

  BASIC_INPUT_ID = 'basic_input';
  PASSWORD_INPUT_ID = 'password_input';

  form_input = new FormGroup({});

  basicInputConfig: IInputComponentConfig = {
    id: this.BASIC_INPUT_ID,
    formGroup: this.form_input,
    label: 'Input.LabelText',
    type: 'text'
  };

  passwordInputConfig: IInputComponentConfig = {
    id: this.PASSWORD_INPUT_ID,
    formGroup: this.form_input,
    label: 'Input.LabelText',
    type: 'password'
  };

  inputTitleSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Input.Title',
    anchorType: slugAnchorType.primary
  };

  interactiveDemoSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.InteractiveDemo',
    anchorType: slugAnchorType.primary
  };

  typesSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.TypesHeading',
    anchorType: slugAnchorType.primary
  };

  configurationSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.ConfigurationsHeading',
    anchorType: slugAnchorType.primary
  };

  guidelineSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.DesignGuidelinesHeading',
    anchorType: slugAnchorType.primary
  };

  anatomySlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.AnatomyHeading',
    anchorType: slugAnchorType.primary
  };

  specsSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.SpecsHeading',
    anchorType: slugAnchorType.primary
  };

  contentGuideSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.ContentGuidelinesHeading',
    anchorType: slugAnchorType.primary
  };

  figmaSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.FigmaHeading',
    anchorType: slugAnchorType.primary
  };

  accessibilitySlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.AccessibilityHeading',
    anchorType: slugAnchorType.primary
  };

  researchSlugConfig: slugTitleURLConfig = {
    type: slugTitleURLType.secondary,
    title: 'Input.ResearchHeading',
    anchorType: slugAnchorType.primary
  };

  figmaDirections: string[] = [
    'Input.FigmaDirectionsListItem1',
    'Input.FigmaDirectionsListItem2',
    'Input.FigmaDirectionsListItem3',
    'Input.FigmaDirectionsListItem4'
  ];

  accessibilityContentItems: string[] = [
    'Input.AccessibilityContentItem1',
    'Input.AccessibilityContentItem2',
    'Input.AccessibilityContentItem3',
    'Input.AccessibilityContentItem4',
    'Input.AccessibilityContentItem5',
    'Input.AccessibilityContentItem6',
    'Input.AccessibilityContentItem7'
  ];

  anatomyContentItems: ContentItem[] = [
    {
      title: 'Input.AnatomyLabelHeading',
      description: 'Input.AnatomyLabelText'
    },
    {
      title: 'Input.AnatomyRequiredIndicatorHeading',
      description: 'Input.AnatomyRequiredIndicatorText'
    },
    {
      title: 'Input.AnatomyDescHeading',
      description: 'Input.AnatomyDescText'
    },
    {
      title: 'Input.AnatomyHintHeading',
      description: 'Input.AnatomyHintText'
    },
    {
      title: 'Input.AnatomyInputFieldHeading',
      description: 'Input.AnatomyInputFieldText'
    },
    {
      title: 'Input.AnatomyInputContentHeading',
      description: 'Input.AnatomyInputContentText'
    },
    {
      title: 'Input.AnatomyErrorHeading',
      description: 'Input.AnatomyErrorText'
    },
    {
      title: 'Input.AnatomyPasswordHeading',
      description: 'Input.AnatomyPasswordText'
    }
  ];

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService,
    private slugify: SlugifyPipe
  ) {
    this.currentLanguage = translate.currentLang;
  }

  ngOnInit(): void {
    this.lang.setAltLangLink(this.altLangLink);
    this.form_input.addControl(this.BASIC_INPUT_ID, new FormControl());
    this.form_input.addControl(this.PASSWORD_INPUT_ID, new FormControl());
  }
}