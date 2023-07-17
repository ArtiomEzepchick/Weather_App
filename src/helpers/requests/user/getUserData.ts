import { UserDataPayload } from "../../../types/user/user";

export const getUserData = async (token: string): Promise<UserDataPayload> => {
  try {
    const AUTH_URL: string = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`;

    const response: Response = await fetch(AUTH_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error(`${response}`);
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
