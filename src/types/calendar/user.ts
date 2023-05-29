export interface UserDataPayload {
  email: string;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  picture: string;
}

export interface FormattedEventsItem {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: string;
}