import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TypographyProps = {
  className?: string;
  children: ReactNode;
};

const LabelSemiboldExtraSmall = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-xs font-semibold tracking-wide`, className)}>
    {children}
  </p>
);

const LabelSemiboldSmall = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-sm font-semibold tracking-wide`, className)}>
    {children}
  </p>
);

const LabelSemiboldMedium = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-base font-semibold tracking-wide`, className)}>
    {children}
  </p>
);

const LabelMediumSmall = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-sm font-medium tracking-wide`, className)}>
    {children}
  </p>
);

const LabelMediumExtraSmall = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-xs font-medium tracking-wide`, className)}>
    {children}
  </p>
);

const LabelMediumMedium = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-sm font-medium tracking-wide`, className)}>
    {children}
  </p>
);

const LabelSemiboldLarge = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-lg font-semibold tracking-wide`, className)}>
    {children}
  </p>
);

const LabelSemiboldExtraLarge = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-xl font-semibold tracking-wide`, className)}>
    {children}
  </p>
);

const BodyRegularExtraSmall = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-xs font-normal`, className)}>{children}</p>
);

const BodySemiboldExtraSmall = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-xs font-semibold`, className)}>{children}</p>
);

const BodyRegularSmall = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-sm font-normal`, className)}>{children}</p>
);

const BodySemiboldSmall = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-sm font-semibold`, className)}>{children}</p>
);

const BodyRegularMedium = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-sm font-normal`, className)}>{children}</p>
);

const BodyMediumMedium = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-sm font-medium`, className)}>{children}</p>
);

const BodySemiboldMedium = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-base font-semibold`, className)}>{children}</p>
);

const BodyRegularLarge = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-md font-normal`, className)}>{children}</p>
);

const BodyMediumLarge = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-md font-medium`, className)}>{children}</p>
);

const BodySemiboldLarge = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-lg font-semibold`, className)}>{children}</p>
);

const BodyBoldLarge = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-lg font-bold`, className)}>{children}</p>
);

const BodyRegularExtraLarge = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-xl font-normal`, className)}>{children}</p>
);

const BodySemiboldExtraLarge = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-xl font-semibold`, className)}>{children}</p>
);

const HeadingMediumExtraSmall = ({ className, children }: TypographyProps) => (
  <h2 className={twMerge(`text-xl font-medium`, className)}>{children}</h2>
);

const HeadingSemiboldExtraSmall = ({
  className,
  children,
}: TypographyProps) => (
  <h1 className={twMerge(`text-xl font-semibold`, className)}>{children}</h1>
);

const HeadingMediumSmall = ({ className, children }: TypographyProps) => (
  <h2 className={twMerge(`text-2xl font-medium`, className)}>{children}</h2>
);

const HeadingSemiboldSmall = ({ className, children }: TypographyProps) => (
  <h1 className={twMerge(`text-2xl font-semibold`, className)}>{children}</h1>
);

const HeadingMediumMedium = ({ className, children }: TypographyProps) => (
  <h2 className={twMerge(`text-[28px] leading-[40px] font-medium`, className)}>
    {children}
  </h2>
);

const HeadingSemiboldMedium = ({ className, children }: TypographyProps) => (
  <h2
    className={twMerge(`text-[28px] leading-[40px] font-semibold`, className)}
  >
    {children}
  </h2>
);

const HeadingMediumLarge = ({ className, children }: TypographyProps) => (
  <h2 className={twMerge(`text-[32px] leading-[44px] font-medium`, className)}>
    {children}
  </h2>
);

const HeadingSemiboldLarge = ({ className, children }: TypographyProps) => (
  <h2
    className={twMerge(`text-[28px] leading-[44px] font-semibold`, className)}
  >
    {children}
  </h2>
);

const HeadingMediumExtraLarge = ({ className, children }: TypographyProps) => (
  <h2 className={twMerge(`text-4xl font-medium`, className)}>{children}</h2>
);

const HeadingSemiboldExtraLarge = ({
  className,
  children,
}: TypographyProps) => (
  <h2 className={twMerge(`text-4xl font-semibold`, className)}>{children}</h2>
);

const HeadingboldExtraLarge = ({ className, children }: TypographyProps) => (
  <h2
    className={twMerge(
      `text-2xl leading-[43px] font-bold tracking-wider`,
      className,
    )}
  >
    {children}
  </h2>
);

const DisplaySemiboldSmall = ({ className, children }: TypographyProps) => (
  <p className={twMerge(`text-4xl font-semibold tracking-tighter`, className)}>
    {children}
  </p>
);

const DisplaySemiboldMedium = ({ className, children }: TypographyProps) => (
  <p
    className={twMerge(
      `text-[44px] leading-[60px] font-semibold tracking-normal`,
      className,
    )}
  >
    {children}
  </p>
);

const DisplaySemiboldLarge = ({ className, children }: TypographyProps) => (
  <p
    className={twMerge(
      `text-[52px] leading-[72px] font-semibold tracking-tighter`,
      className,
    )}
  >
    {children}
  </p>
);

const DisplaySemiboldExtraLarge = ({
  className,
  children,
}: TypographyProps) => (
  <p className={twMerge(`text-7xl font-semibold tracking-tighter`, className)}>
    {children}
  </p>
);

const Typography = ({ className, children }: TypographyProps) => (
  <span className={className}>{children}</span>
);

Typography.LabelSemiboldExtraSmall = LabelSemiboldExtraSmall;
Typography.LabelSemiboldSmall = LabelSemiboldSmall;
Typography.LabelMediumMedium = LabelMediumMedium;
Typography.LabelMediumExtraSmall = LabelMediumExtraSmall;
Typography.LabelMediumSmall = LabelMediumSmall;

Typography.LabelSemiboldMedium = LabelSemiboldMedium;
Typography.LabelSemiboldLarge = LabelSemiboldLarge;
Typography.LabelSemiboldExtraLarge = LabelSemiboldExtraLarge;

Typography.BodyRegularExtraSmall = BodyRegularExtraSmall;
Typography.BodyMediumMedium = BodyMediumMedium;

Typography.BodySemiboldExtraSmall = BodySemiboldExtraSmall;
Typography.BodyRegularSmall = BodyRegularSmall;
Typography.BodySemiboldSmall = BodySemiboldSmall;
Typography.BodyRegularMedium = BodyRegularMedium;
Typography.BodySemiboldMedium = BodySemiboldMedium;
Typography.BodyRegularLarge = BodyRegularLarge;
Typography.BodySemiboldLarge = BodySemiboldLarge;
Typography.BodyRegularExtraLarge = BodyRegularExtraLarge;
Typography.BodyBoldLarge = BodyBoldLarge;
Typography.BodySemiboldExtraLarge = BodySemiboldExtraLarge;
Typography.BodyMediumLarge = BodyMediumLarge;
Typography.HeadingMediumExtraSmall = HeadingMediumExtraSmall;
Typography.HeadingSemiboldExtraSmall = HeadingSemiboldExtraSmall;
Typography.HeadingMediumSmall = HeadingMediumSmall;
Typography.HeadingSemiboldSmall = HeadingSemiboldSmall;
Typography.HeadingMediumMedium = HeadingMediumMedium;
Typography.HeadingSemiboldMedium = HeadingSemiboldMedium;
Typography.HeadingMediumLarge = HeadingMediumLarge;
Typography.HeadingSemiboldLarge = HeadingSemiboldLarge;
Typography.HeadingMediumExtraLarge = HeadingMediumExtraLarge;
Typography.HeadingSemiboldExtraLarge = HeadingSemiboldExtraLarge;
Typography.HeadingboldExtraLarge = HeadingboldExtraLarge;

Typography.DisplaySemiboldSmall = DisplaySemiboldSmall;
Typography.DisplaySemiboldMedium = DisplaySemiboldMedium;
Typography.DisplaySemiboldLarge = DisplaySemiboldLarge;
Typography.DisplaySemiboldExtraLarge = DisplaySemiboldExtraLarge;

export { Typography };
