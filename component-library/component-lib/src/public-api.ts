/*
 * Public API Surface of ircc-ds-angular-component-library
 */

/** Non-Components - Shared **/
export * from './shared/functions/stand-alone.functions'
export * from './shared/interfaces/component-configs';
export * from './shared/constants/jl-components/jl-components.constants/jl-components.constants'


/** Banner Component **/
export * from './lib/banner-component/ircc-ds-angular-banner.module';
export * from './lib/banner-component/banner/banner.component';


/** Form Input Components **/
export * from './lib/form-components/ircc-ds-angular-form-components.module';
export * from './lib/form-components/checkbox/checkbox.component';
export * from './lib/form-components/error/error.component';
export * from './lib/form-components/input/input.component';
export * from './lib/form-components/radio-input/radio-input.component';
export * from './lib/form-components/date-picker/date-picker.component';
export * from './lib/form-components/select/select.component';

/** Header/Footer Components **/
export * from './lib/header-footer/ircc-ds-angular-header-footer.module';
export * from './lib/header-footer/footer/footer.component';
export * from './lib/header-footer/header/header.component';
export * from './lib/header-footer/language-switch/language-switch.component';
export * from './lib/header-footer/language-switch/language-switch-button.service';


/** Legacy/Old Components **/
export * from './lib/legacy-old/ircc-ds-angular-legacy-old.module';
export * from './lib/legacy-old/autocomplete/autocomplete.component';
export * from './lib/legacy-old/chips/chip-item/chip-item.component';
export * from './lib/legacy-old/chips/chip-list/chip-list.component';
export * from './lib/legacy-old/chips/secondary-chips/secondary-chips.component';
export * from './lib/legacy-old/search-input/search-input.component';


/** Shared Components **/
export * from './lib/shared/ircc-ds-angular-component-shared.module';
export * from './lib/shared/button/button.component';
export * from './lib/shared/icon/icon.component';
export * from './lib/shared/icon-button/icon-button.component';
export * from './lib/shared/tabs/tabs.component';
export * from './lib/shared/progress-tags/progress-tags.component';
export * from './lib/shared/dropdown/drop-down.component';
export * from './lib/shared/label/label.component';