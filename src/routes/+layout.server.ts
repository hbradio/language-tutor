import type { LayoutServerLoad, User} from "./$types"
import { redirect } from "@sveltejs/kit";
import prisma from '$lib/prisma';

export const prerender = false;

export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.getSession();
  if (!session?.user) throw redirect(303, "/auth/signin");
  const user: User = await prisma.user.findUnique({
    where: { email: session.user.email }
  })
  if (user == null) {
    const createUserResponse = await prisma.user.create({
      data: {
        email: session.user.email,
        credits: 5
      }
    })
  }
  return {
    session: session,
    user: user,
  }
}
