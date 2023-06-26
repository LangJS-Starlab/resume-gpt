import { cookies, headers } from 'next/headers';
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"

// Workaround for: https://github.com/nextauthjs/next-auth/issues/7486
// so that we can call getServerSession in a server action from a client component
export const getServerSessionZ = async () => {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value]),
    ),
  };
  const res = { getHeader() {}, setCookie() {}, setHeader() {} };

  // @ts-ignore - The type used in next-auth for the req object doesn't match, but it still works 
  const session = await getServerSessionNextAuth(req, res, authOptions);
  return session;
};

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  return session?.user
}