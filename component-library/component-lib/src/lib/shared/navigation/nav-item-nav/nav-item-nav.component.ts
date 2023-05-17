import { Renderer2, Input } from '@angular/core';
import { DSSizes } from '../../../../shared/constants/jl-components.constants';
import { Component, OnInit } from '@angular/core';

import { NavigationIndicator, NavigationItemLink } from '../navigation.types';
import { IIndicatorConfig } from '../../indicator/indicator.component';

@Component({
  selector: 'ircc-cl-lib-nav-item',
  templateUrl: './nav-item-nav.component.html'
})
export class navItemNavComponent implements OnInit {

  @Input() config: NavigationItemLink = {
    id: '',
    href: '',
    anchor: '',
    external: false,
    border: false,
    label: '',
    icon: '',
    trailingIcon: '',
    type: 'link',
    children: []
  };

  @Input() id: string = '';
  @Input() size?: keyof typeof DSSizes;
  @Input() indicator?: NavigationIndicator;

  indicatorConfig : IIndicatorConfig = {
    category: 'weak',
    purpose: 'status',
    type: 'dot'
  }

  constructor(private renderer: Renderer2) {}

  linkClick(e: Event){
      if(!this.config.external){
        setTimeout(() => {
          if(this.config?.anchor){
          const anchorElement = this.renderer.selectRootElement(`#${this.config.anchor}`, true);
          anchorElement ? anchorElement.scrollIntoView({ behavior: 'smooth' }) : null;
          }
        }, 0);
      }
      alert(`Insert service here. Click event on nav-item with id: ${this.config.id}`)
  }

  ngOnInit() {
    this.id !== '' ? (this.config.id = this.id) : undefined;
    if (this.config.indicator){
      this.indicatorConfig = {
        type: 'dot',
        category: 'weak',
        purpose: 'status',
        status: this.config.indicator.status,
        icon: this.config.indicator.icon
      }
      this.config.indicator.label ? this.indicatorConfig = {...this.indicatorConfig, type: 'text', label: this.config.indicator.label} : null;
      this.size ? this.indicatorConfig = {...this.indicatorConfig, size: this.size} : null;

    }
  }
}
