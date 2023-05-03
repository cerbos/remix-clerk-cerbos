import { getAuth } from '@clerk/remix/ssr.server';
import { createClerkClient } from '@clerk/remix/api.server';
import type { LoaderFunction } from '@remix-run/node';

export const requireUser = async (args: Parameters<LoaderFunction>[0]) => {
  const auth = await getAuth(args);
  if (!auth.userId) {
    throw new Response('Unauthorized', { status: 401 });
  }

  return await createClerkClient({
    apiKey: process.env.CLERK_SECRET_KEY,
  }).users.getUser(auth.userId)

};
