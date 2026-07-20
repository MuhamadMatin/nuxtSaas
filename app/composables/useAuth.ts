import { polarClient } from "@polar-sh/better-auth";
import { createAuthClient } from "better-auth/vue"

export function useAuth() {
  const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
    plugins: [
      polarClient(),
    ]
  });

  const logout = async({redirectTo}: {redirectTo?: RouteLocationRaw} = {}) => {
    await authClient.signOut();

    if (redirectTo) {
      await navigateTo(redirectTo);
    }
  }

  const upgradeToPro = async () =>{
    await authClient.checkout({
      slug: "pro-monthly"
    })
  }

  return {
    signIn: authClient.signIn,
    signUp: authClient.signUp,
    logout,
    upgradeToPro,
  }
}