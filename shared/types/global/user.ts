import type {
  ErrorResponse,
  SuccessNullResponse,
  SuccessResponse,
} from '@/shared/types';

type Profile = {
  address_1: string | null;
  address_2: string | null;
  country: string | null;
  date_of_birth: string | null;
  first_name: string;
  is_details_submitted: boolean;
  is_form_filled: boolean;
  is_google_login: boolean;
  last_name: string;
  email: string;
  phone: string | null;
  profile_image: string | null;
  state: string | null;
  period_type: string;
  subscription_type: string;
  is_journey_completed: boolean;
  subscription_percent: number;
  renewal_date: string;
  subscription_status: string;
};

type UploadImageRequest = {
  file: FormData;
};

type DeleteAccountRequest = {
  password: string;
};

type ChangePasswordRequest = {
  password: string;
  new_password: string;
  confirm_password: string;
};

type UpdateProfileRequest = {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  address_1: string;
  country: string;
  state: string;
  phone: string;
  profile_image: string;
};

interface ProfileSuccess extends SuccessResponse {
  data: Profile;
}

interface ChangePasswordSuccess extends SuccessResponse {
  data: null;
}

interface UploadImageSuccess extends SuccessResponse {
  data: {
    url: string;
  };
}

type UploadImageResponse = UploadImageSuccess | ErrorResponse;
type DeleteAccountResponse = ChangePasswordSuccess | ErrorResponse;
type ChangePasswordResponse = ChangePasswordSuccess | ErrorResponse;
type ProfileResponse = ProfileSuccess | ErrorResponse;

type UpdateJourneyResponse = SuccessNullResponse | ErrorResponse;

type UpdateProfileResponse = SuccessNullResponse | ErrorResponse;

export type {
  ProfileResponse,
  Profile,
  UploadImageRequest,
  DeleteAccountRequest,
  ChangePasswordRequest,
  ChangePasswordResponse,
  DeleteAccountResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  UploadImageResponse,
  ProfileSuccess,
  UpdateJourneyResponse,
};
