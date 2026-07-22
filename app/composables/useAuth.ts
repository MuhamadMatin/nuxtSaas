import { polarClient } from "@polar-sh/better-auth";
import type { BetterAuthClientOptions, InferUserFromClient, InferSessionFromClient } from "better-auth";
import { createAuthClient } from "better-auth/vue"

export function useAuth() {
  const url = useRequestURL();
  const headers = import.meta.server ? useRequestHeaders() : undefined;
  const session = useState<InferSessionFromClient<BetterAuthClientOptions> | null>('auth:session', () => null);
  const user = useState<InferUserFromClient<BetterAuthClientOptions> | null>('auth:user', () => null);

  const sessionFetch = import.meta.server ? ref(false) : useState('auth:sessionFetch', () => false)

  const authClient = createAuthClient({
    baseURL: url.origin,
    fetchOptions: {
      headers
    },
    plugins: [
      polarClient(),
    ]
  });

  const fetchSession = async () => {
    if (sessionFetch.value) {
      return
    }

    sessionFetch.value = true;
    const { data } = await authClient.getSession({
      fetchOptions: {
        headers
      }
    })

    session.value = data?.session || null;
    user.value = data?.user || null;
    sessionFetch.value = false;
    return data;
  }

  if (import.meta.client) {
    authClient.$store.listen('$sessionSignal', async (signal) => {
      if (signal) {
        return
      }
      await fetchSession();
    })
  }

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
    session,
    user,
    loggedIn: computed(() => !!session.value),
    fetchSession
  }
}