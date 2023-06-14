export const logOutUser = async (token: string): Promise<void> => {
  const REVOKE_URL = `https://oauth2.googleapis.com/revoke?token=${token}`

  try {
      await fetch(REVOKE_URL, {
          method: 'POST',
          headers: {
              'Content-type': 'application/x-www-form-urlencoded'
          }
      })
  } catch (error: any) {
      throw new Error("Can't logout current user")
  }
}