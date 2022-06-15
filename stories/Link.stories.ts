import { CommonModule } from '@angular/common';
import { IconComponent } from '@ircc-ca/ds-sdc-angular/icon';
import { LinkComponent } from '@ircc-ca/ds-sdc-angular/link';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';

export default {
    title: 'Components/Link',
    component: LinkComponent,
    args: {
        ngContent: 'Link',
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/16zKKXc4pzBdRAXmbz6Ht4/Components?node-id=83%3A685',
        },
    },
    decorators: [
        moduleMetadata({
            declarations: [LinkComponent, IconComponent],
            imports: [CommonModule],
        }),
    ],
} as Meta<LinkComponent>;

const Template: Story<LinkComponent> = (args: LinkComponent) => ({
    props: { ...args },
    template: `
    <jds-link 
    [download]="download"
    [href]="href"
    [target]="target"
    [ariaLabel]="ariaLabel"
    >{{ ngContent }}</jds-link>
  `,
});

export const Default = Template.bind({});
Default.args = {
    ariaLabel: 'aria',
    href: 'https://www.github.com',
    target: '_blank',
};
