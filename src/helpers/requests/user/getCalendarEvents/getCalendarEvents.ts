import { CALENDAR_URL } from "../../../constants/user/user";

export const getCalendarEvents = async (token: string) => {
  try {
    const response = await fetch(CALENDAR_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error(`Error: expected status 200 but got ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};
