import { Header, SidebarLayout } from '@/shared/components';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full">
      <SidebarLayout>
        <Header />
        {children}
      </SidebarLayout>
    </div>
  );
};

export default ProtectedLayout;
