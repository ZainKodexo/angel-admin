import { Header, SidebarLayout } from '@/shared/components';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full">
      <SidebarLayout>
        <Header />
        <main className="p-4">{children}</main>
      </SidebarLayout>
    </div>
  );
};

export default ProtectedLayout;
