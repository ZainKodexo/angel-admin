import { AppSidebar, SidebarInset, SidebarProvider } from '@/shared/components';

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export { SidebarLayout };
