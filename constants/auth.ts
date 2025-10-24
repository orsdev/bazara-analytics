export const authTokenKey = 'bazara_auth_token';

export const cookieOptions = {
  dev: (hours = 24) => {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + hours * 60 * 60 * 1000);

    return {
      sameSite: 'lax' as const,
      secure: false,
      httpOnly: true,
      expires: expiryDate
    };
  },
  prod: (hours = 24) => {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + hours * 60 * 60 * 1000);

    return {
      secure: true,
      sameSite: 'lax' as const,
      httpOnly: true,
      expires: expiryDate
    };
  }
};
