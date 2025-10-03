'use client';
import { Breadcrumb } from '@/shared/components';
import { SidebarTrigger } from '../Sidebar/SidebarElements';

const Header = () => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumb />
      </div>
    </header>
  );
};

export { Header };
