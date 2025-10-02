import { Header, SidebarLayout } from '@/shared/components';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full flex-col">
      <SidebarLayout>
        <Header />
        <main className="flex-1 p-4">{children}</main>
      </SidebarLayout>
    </div>
  );
};

export default ProtectedLayout;
