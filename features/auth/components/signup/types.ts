type Bio = {
  first_name: string;
  last_name: string;
  email: string;
};

type Address = {
  address_1: string;
  address2_?: string;
  country: string;
  state: string;
};

type Password = {
  password: string;
  confirm_password: string;
};

type GoogleUser = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  hd: string;
};

type SignupData = Bio & Address & Password;

export type { Bio, Address, Password, SignupData, GoogleUser };
