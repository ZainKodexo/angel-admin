'use client';
import { getProfile, logout } from '@/features/auth/actions';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './SidebarElements';

import { AUTH_QUERY } from '@/features/auth/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/shared/components';
import { useActionWithFeedback } from '@/shared/hooks';
import { getInitials } from '@/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { ChevronsUpDown, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '../../Skeleton';

export const UserProfile = () => {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryFn: getProfile,
    queryKey: [AUTH_QUERY.ADMIN_PROFILE],
  });

  const { mutate } = useActionWithFeedback({
    mutationFn: logout,
    mutationKey: [AUTH_QUERY.LOGOUT],
    onSuccess: () => {
      router.replace('/auth/login');
    },
  });

  const userInitial = getInitials(data?.data.full_name || 'CN');

  if (!data || isLoading) {
    return (
      <div className="p-2">
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    );
  }
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={''} alt={''} />
                  <AvatarFallback className="rounded-lg">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {data.data.full_name}
                  </span>
                  <span className="truncate text-xs">{data.data.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side="bottom"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={''} alt={''} />
                    <AvatarFallback className="rounded-lg">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {data.data.full_name}
                    </span>
                    <span className="truncate text-xs">{data.data.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={mutate}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};
