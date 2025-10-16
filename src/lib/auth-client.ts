import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient();

export const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "github",
    callbackURL: "/generate",
  });

  return data;
};
export const signOut = async () => {
  const data = await authClient.signOut();
  return data;
};
