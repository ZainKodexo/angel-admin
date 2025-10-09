import Image from 'next/image';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-full grid-cols-12 items-center gap-6 px-4 md:py-8 lg:px-6 xl:px-12">
      <div className="relative col-span-12 mx-auto flex w-full max-w-xl flex-col gap-y-8">
        <div className="relative mx-auto h-14 w-80">
          <Image
            src="/assets/applogo.svg"
            fill
            alt="Angel therapy logo"
            sizes="320px"
            className="object-contain"
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
