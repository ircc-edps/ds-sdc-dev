import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LanguageSwitchButtonService } from 'ircc-ds-angular-component-library';
import { LangSwitchService } from '../share/lan-switch/lang-switch.service';
import { DisplayLanguages, Languages } from '../share/global-params';
import { ISideNavDataInterface } from '@app/components/side-nav/side-nav.model';
import { SideNavConfig } from '@app/components/side-nav/side-nav.config';

import {
  INavigationConfig,
  NavigationItemLink,
  NavigationItemAccordion,
  NavigationItemHeading
} from 'ircc-ds-angular-component-library';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  title = 'ds-sdc-doc';
  leftNavData: ISideNavDataInterface[];
  mobile = false;
  navStatus = 'nav-open';
  public innerWidth: any; // Width of viewport window
  /** String for storing the URL of the page with the alternative language set */
  altLangURL: string = '';
  altPathKey: string = '';
  language: string = this.translate.currentLang;

  itemAA: NavigationItemLink = {
    label: 'Overview.Heading',
    href: 'ROUTES.overview',
    anchor: false,
    id: 'Overview.Heading',
    icon: '',
    type: 'link',
    children: []
  };
  itemAB: NavigationItemLink = {
    label: 'Designers.Heading',
    href: 'ROUTES.forDesigners',
    anchor: false,
    id: 'Designers.Heading',
    icon: '',
    type: 'link',
    children: []
  };
  itemAC: NavigationItemLink = {
    label: 'Overview.DeveloperHeading',
    href: 'ROUTES.forDevelopers',
    anchor: false,
    id: 'Overview.DeveloperHeading',
    icon: '',
    type: 'link',
    children: []
  };
  itemA: NavigationItemHeading = {
    id: 'GetStartedHeading',
    label: 'Developers.GetStartedHeading',
    icon: 'fa-light fa-basketball',
    type: 'heading',
    children: [this.itemAA, this.itemAB, this.itemAC]
  };

  mashsa: NavigationItemLink = {
    label: 'mahsa',
    href: 'ROUTES.mahsa',
    anchor: false,
    id: 'mahsa',
    icon: '',
    type: 'link',
    children: []
  };

  michael: NavigationItemLink = {
    label: 'michael',
    href: 'ROUTES.michael',
    anchor: false,
    id: 'michael',
    icon: '',
    type: 'link',
    children: []
  };

  naseer: NavigationItemLink = {
    label: 'naseer',
    href: 'ROUTES.naseer',
    anchor: false,
    id: 'naseer',
    icon: '',
    type: 'link',
    children: []
  };

  mike: NavigationItemLink = {
    label: 'mike',
    href: 'ROUTES.mike',
    anchor: false,
    id: 'mike',
    icon: '',
    type: 'link',
    children: []
  };
  bobby: NavigationItemLink = {
    label: 'bobby',
    href: 'ROUTES.bobby',
    anchor: false,
    id: 'bobby',
    icon: '',
    type: 'link',
    children: []
  };

  accessibility: NavigationItemLink = {
    label: 'Accessibility Demo',
    href: '/en/accessibility-demo',
    anchor: false,
    id: 'accessibility',
    icon: '',
    type: 'link',
    children: []
  };

  banner: NavigationItemLink = {
    label: 'Banner Documentation',
    href: '/en/banner-doc',
    anchor: false,
    id: 'banner',
    icon: '',
    type: 'link',
    children: []
  };

  codeview: NavigationItemLink = {
    label: 'Code Viewer',
    href: '/en/codeview',
    anchor: false,
    id: 'codeview',
    icon: '',
    type: 'link',
    children: []
  };

  button: NavigationItemLink = {
    label: 'Button Documentation',
    href: '/en/button-doc',
    anchor: false,
    id: 'button',
    icon: '',
    type: 'link',
    children: []
  };

  input: NavigationItemLink = {
    label: 'Input Documentation',
    href: '/en/input-documentation',
    anchor: false,
    id: 'input',
    icon: '',
    type: 'link',
    children: []
  };

  other: NavigationItemAccordion = {
    id: 'other',
    label: 'Other Pages',
    type: 'accordion',
    open: true,
    children: [
      this.accessibility,
      this.banner,
      this.codeview,
      this.button,
      this.input
    ]
  };

  itemQA: NavigationItemAccordion = {
    id: 'qa',
    label: 'QA.header',
    type: 'accordion',
    children: [this.mashsa, this.michael, this.naseer, this.mike, this.bobby],
    open: true
  };

  navConfig: INavigationConfig = {
    id: 'shell_nav',
    size: 'small',
    label: 'Step title',
    iconLeading: 'fa-light fa-arrow-left',
    iconTrailing: 'fa-light fa-arrow-right',
    navigationConfig: [this.itemA, this.itemQA, this.other]
  };

  navConfigLarge: INavigationConfig = {
    id: 'shell_nav',
    size: 'large',
    label: 'Step title Large',
    navigationConfig: [{ ...this.itemA }, { ...this.itemQA }, { ...this.other }]
  };

  randomHeader: string = '';
  randomFooter: string = '';

  //
  //
  constructor(
    private translate: TranslateService,
    private altLang: LangSwitchService,
    private languageSwitchButton: LanguageSwitchButtonService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
    private navBarConfig: SideNavConfig
  ) {
    this.leftNavData = navBarConfig.getLeftNavBarConfig();
  }

  ngOnInit() {
    this.onResize();

    this.altLang.getAltLangLink().subscribe((altLang: string) => {
      this.altPathKey = altLang;
      this.setAltLangURL();
    });

    this.languageSwitchButton.languageClickObs$.subscribe((response) => {
      if (response) this.changeLang(); //Has to ignore the first response.
    });

    this.randomHeader = `//picsum.photos/id/${Math.floor(
      Math.random() * (1084 - 1) + 1
    )}/200/200`;

    this.randomFooter = `//picsum.photos/id/${Math.floor(
      Math.random() * (1084 - 1) + 1
    )}/200/200`;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 992) {
      this.mobile = true;
      this.navStatus = 'nav-closed';
    } else {
      this.mobile = false;
      this.navStatus = 'nav-open';
    }
  }

  /** Toggles language without reloading component */
  changeLang() {
    // e.preventDefault();
    // Swaps language
    const curLang = this.translate.currentLang;
    this.translate.use(
      curLang === Languages.English ? Languages.French : Languages.English
    );
    // Changes the html lang attribute
    document.documentElement.lang =
      curLang === Languages.English ? Languages.French : Languages.English;
    // Pushes page into history to allow the use of the 'Back' button on browser
    window.history.pushState('', '', this.altLangURL);
    this.setAltLangURL();

    this.router.navigateByUrl(this.altLangURL);
    this.changeLangStr();
  }

  setAltLangURL() {
    this.altLangURL = this.translate.currentLang ?? Languages.English;
    if (this.altPathKey)
      this.altLangURL +=
        '/' + this.translate.instant('ROUTES.' + this.altPathKey);
  }

  /** Change display string of language **/
  changeLangStr() {
    const curLang = this.translate.currentLang;
    if (this.mobile) {
      curLang === Languages.English
        ? (this.language = DisplayLanguages.FR)
        : (this.language = DisplayLanguages.EN);
    } else {
      curLang === Languages.English
        ? (this.language = DisplayLanguages.French)
        : (this.language = DisplayLanguages.English);
    }
  }
}
