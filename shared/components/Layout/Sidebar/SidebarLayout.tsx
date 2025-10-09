import { AppSidebar, SidebarInset, SidebarProvider } from '@/shared/components';

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export { SidebarLayout };
