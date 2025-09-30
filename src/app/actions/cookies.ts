"use server";

import { cookies } from "next/headers";

export const setCookieByKey = async (key: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(key, value, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });
};

export const getCookieByKey = async (key: string) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(key);

  if (!cookie) return null;

  return cookie.value;
};

export const deleteCookieByKey = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(key);
};
