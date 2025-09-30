import { Inter, Poppins } from 'next/font/google';
import { tv } from 'tailwind-variants';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '600', '700'],
});

const button = tv({
  base: `flex items-center justify-center rounded-lg gap-2`,
  variants: {
    variant: {
      primary: `bg-content-brand hover:bg-button-background-primary-pressed text-sm text-button-content-primary-default tracking-wide font-semibold h-10 p-2 ${poppins.className}`,
      secondary: `button-background-secondary-default hover:bg-button-background-secondary-pressed text-sm text-button-content-primary-default tracking-wide font-semibold h-10 p-2 ${poppins.className}`,
      link: `block content-alwaysDark font-normal text-base hover:underline ${inter.className}`,
    },
    disabled: {
      true: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    disabled: false,
  },
  compoundVariants: [
    {
      variant: 'primary',
      disabled: false,
      className: 'text-button-content-primary-default',
    },
    {
      variant: 'primary',
      disabled: true,
      className:
        'bg-button-background-primary-disabled hover:bg-button-background-primary-disabled text-button-content-primary-disabled',
    },
    {
      variant: 'secondary',
      disabled: false,
      className: 'border-2 text-button-content-secondary-default',
    },
    {
      variant: 'secondary',
      disabled: true,
      className:
        'bg-button-background-secondary-disabled hover:bg-button-background-secondary-disabled text-button-content-secondary-disabled',
    },
  ],
});

export { button };
