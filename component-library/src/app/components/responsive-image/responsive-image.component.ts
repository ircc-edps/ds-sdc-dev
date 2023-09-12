import {
  Component,
  Input,
  Renderer2,
  ElementRef,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface IResponsiveImageComponentConfig {
  id: string;
  breakpoints: {
    maxWidth: number;
    src: string;
  }[];
  defaultSrc: string;
  altText: string;
  lazyLoad?: boolean;
}

@Component({
  selector: 'app-responsive-image',
  templateUrl: './responsive-image.component.html',
  styleUrls: ['./responsive-image.component.scss']
})
export class ResponsiveImageComponent implements AfterViewInit {
  @ViewChild('image', { static: true })
  image!: ElementRef<HTMLImageElement>;
  @Input() config: IResponsiveImageComponentConfig = {
    id: '',
    breakpoints: [{ maxWidth: 0, src: '' }],
    altText: '',
    defaultSrc: '',
    lazyLoad: false
  };

  constructor(
    private translate: TranslateService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngAfterViewInit() {
    this.updateImageSrc();
    window.addEventListener('resize', () => this.updateImageSrc());
  }

  updateImageSrc() {
    const screenWidth = window.innerWidth;

    // Find the matching breakpoint for the current screen width
    const breakpoint = this.config.breakpoints.find(
      (breakpoint) => screenWidth <= breakpoint.maxWidth
    );

    if (breakpoint) {
      // Set the src attribute of the image to the matched breakpoint's src
      this.renderer.setAttribute(
        this.image.nativeElement,
        'src',
        breakpoint.src
      );
    } else {
      // If no matching breakpoint is found, use the default src
      this.renderer.setAttribute(
        this.image.nativeElement,
        'src',
        this.config.defaultSrc
      );
    }
  }
}