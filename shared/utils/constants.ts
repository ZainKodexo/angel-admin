import {
  RxDashboard,
  IoChatboxEllipsesOutline,
  IoSettingsOutline,
} from '@/shared/icons/server';

const AWS_S3 = process.env.NEXT_PUBLIC_S3_PUBLIC;

const NAV_ITEMS = [
  {
    title: 'Home',
    url: '/',
    icon: RxDashboard,
    isActive: true,
    items: [],
  },
  {
    title: 'Chat',
    url: '/chat',
    icon: IoChatboxEllipsesOutline,
    isActive: false,
    items: [],
  },
  {
    title: 'Settings',
    url: '#',
    icon: IoSettingsOutline,
    isActive: false,
    items: [
      {
        title: 'Profile',
        url: '/settings/profile',
      },
      {
        title: 'Subscription',
        url: '/settings/subscription-management',
      },
    ],
  },
];

export { AWS_S3, NAV_ITEMS };
