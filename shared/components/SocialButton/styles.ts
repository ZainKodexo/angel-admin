import { Roboto } from 'next/font/google';
import { tv } from 'tailwind-variants';

const poppins = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
});

const socialButton = tv({
  base: `flex items-center justify-center h-14 rounded-lg`,
  variants: {
    variant: {
      google: `cursor-pointer border bg-[#E0EFF6] border-border-primary ${poppins.className} shadow-md h-10 p-2`,
      apple: `text-white bg-black ${poppins.className}`,
    },
    disabled: {
      true: '',
    },
  },
  defaultVariants: {
    variant: 'google',
    disabled: false,
  },
  compoundVariants: [],
});

export { socialButton };
