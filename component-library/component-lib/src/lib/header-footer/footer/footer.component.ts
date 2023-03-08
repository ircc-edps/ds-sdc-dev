import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const GOV_LOGO_FOOTER = "https://www.canada.ca/etc/designs/canada/wet-boew/assets/wmms-blk.svg";

export const GOV_LOGO_ARIA_LABEL_ENGLISH = "Symbol of the Government of Canada";
export const GOV_LOGO_ARIA_LABEL_FRENCH = "Symbole du gouvernement du Canada"

@Component({
    selector: 'lib-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    @Input() id = '';

    imageURL = '';
    aria = '';

    constructor(private translate: TranslateService) { }

    ngOnInit() {
        this.setLang(this.translate.currentLang);
        this.translate.onLangChange.subscribe(change => {
            this.setLang(change.lang);
        });
    }

    setLang(lang: string) {
        if ((lang === 'en') || (lang === 'en-US')) {
            this.imageURL = GOV_LOGO_FOOTER;
            this.aria = GOV_LOGO_ARIA_LABEL_ENGLISH;

        } else {
            this.imageURL = GOV_LOGO_FOOTER;
            this.aria = GOV_LOGO_ARIA_LABEL_FRENCH;
        }
    }
}
