import { IoChatboxEllipsesOutline, RxDashboard } from '@/shared/icons/server';

const NAV_ITEMS = [
  {
    title: 'AI Prompts',
    url: '/prompts',
    icon: RxDashboard,
    isActive: true,
    items: [],
  },
  {
    title: 'Email Templates',
    url: '/email-templates',
    icon: IoChatboxEllipsesOutline,
    isActive: false,
    items: [],
  },
];

const OTP_EXPIRY_TIME = 5 * 60;
export { NAV_ITEMS, OTP_EXPIRY_TIME };
