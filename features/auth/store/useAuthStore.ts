import { create } from 'zustand';

type AuthStore = {
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  period: string;
  subscription: string;
  isNewUser: boolean;
  subscriptionUsed: number;
  renewalDate: string;
  subscriptionStatus: string;

  setAvatar: (avatar: string) => void;
  setFirstName: (avatar: string) => void;
  setLastName: (avatar: string) => void;
  setEmail: (avatar: string) => void;
  setPeriod: (avatar: string) => void;
  setSubscription: (avatar: string) => void;
  setIsNewUser: (newUser: boolean) => void;
  setSubscriptionUsed: (newUser: number) => void;
  setRenewalDate: (avatar: string) => void;
  setSubscriptionStatus: (avatar: string) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  avatar: '',
  firstName: '',
  lastName: '',
  email: '',
  period: '',
  subscription: '',
  isNewUser: false,
  subscriptionUsed: 0,
  renewalDate: '',
  subscriptionStatus: '',

  setAvatar: (data: string) => {
    set({
      avatar: data,
    });
  },

  setFirstName: (data: string) => {
    set({
      firstName: data,
    });
  },

  setLastName: (data: string) => {
    set({
      lastName: data,
    });
  },

  setEmail: (data: string) => {
    set({
      email: data,
    });
  },

  setPeriod: (data: string) => {
    set({
      period: data,
    });
  },

  setSubscription: (data: string) => {
    set({
      subscription: data,
    });
  },

  setIsNewUser: (data: boolean) => {
    set({ isNewUser: data });
  },

  setSubscriptionUsed: (data: number) => {
    set({ subscriptionUsed: data });
  },

  setRenewalDate: (data: string) => {
    set({ renewalDate: data });
  },
  setSubscriptionStatus: (data: string) => {
    set({ subscriptionStatus: data.charAt(0).toUpperCase() + data.slice(1) });
  },
}));

export { useAuthStore };
