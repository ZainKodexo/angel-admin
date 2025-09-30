'use client';
import {
  BreadcrumbWrapper,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './BreadcrumbElements';
import { useBreadcrumbs } from '@/shared/hooks';
import { Slash } from 'lucide-react';
import { Fragment } from 'react';

const Breadcrumb = () => {
  const items = useBreadcrumbs();
  if (items?.length === 0) return null;

  return (
    <BreadcrumbWrapper>
      <BreadcrumbList>
        {items?.map((item, index) => (
          <Fragment key={item.title}>
            {index !== items.length - 1 && (
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={item.link}>{item.title}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {index < items.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block">
                <Slash />
              </BreadcrumbSeparator>
            )}
            {index === items.length - 1 && (
              <BreadcrumbPage>{item.title}</BreadcrumbPage>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbWrapper>
  );
};

export { Breadcrumb };
