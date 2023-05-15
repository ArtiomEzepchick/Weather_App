export interface UserTokenPayload {
  access_token: string;
  authuser?: string;
  expires_in: number;
  prompt: string;
  scope: string;
  token_type: string;
}

export interface UserDataPayload {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

export interface FormattedEventsItem {
  id: string;
  title: string;
  start?: string;
  end?: string;
}