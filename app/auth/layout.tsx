const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-full grid-cols-12 gap-6 px-4 md:py-8 lg:px-6 xl:px-12">
      <div className="relative col-span-12 mx-auto h-full w-full max-w-xl">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
