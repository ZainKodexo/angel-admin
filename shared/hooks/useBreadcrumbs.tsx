'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type BreadcrumbItem = {
  title: string;
  link: string;
};

const routeMapping: Record<string, BreadcrumbItem[]> = {
  '/': [
    { title: 'Dashboard', link: '/' },
    { title: 'Overview', link: '/' },
  ],
  '/chat': [
    { title: 'Dashboard', link: '/' },
    { title: 'Chat', link: '/chat' },
  ],

  // '/dashboard/product': [
  //   { title: 'Dashboard', link: '/dashboard' },
  //   { title: 'Product', link: '/dashboard/product' }
  // ]
  // Add more custom mappings as needed
};

function useBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    if (routeMapping[pathname]) {
      return routeMapping[pathname];
    }

    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      return {
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        link: path,
      };
    });
  }, [pathname]);

  return breadcrumbs;
}

export { useBreadcrumbs };
