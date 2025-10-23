export const authTokenKey = 'bazara_auth_token';

export const cookieOptions = {
  dev: (hours = 24) => {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + hours * 60 * 60 * 1000);

    return {
      sameSite: 'lax' as const,
      secure: false,
      httpOnly: false,
      expires: expiryDate
    };
  },
  prod: (hours = 24) => {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + hours * 60 * 60 * 1000);

    return {
      secure: true,
      sameSite: true,
      expires: expiryDate
    };
  }
};
