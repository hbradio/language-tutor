import type { PageServerLoad, Actions, User } from "./$types";
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ parent }) => {
  const data = await parent()
  let user = data.user;
  const session = data.session;

  // Not sure why this is also needed here
  if (user == null) {
    user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })
  }
  if (user == null) {
    try {
      const createUserResponse = await prisma.user.create({
        data: {
          email: session.user.email,
          credits: 5
        }
      })
    } catch {
      console.log("Error in page user create.");
    }
  }

  const response = await prisma.post.findMany({
    where: {
      published: true, 
      author: {
        is: {
          email: user.email,
        }
      }
    },
    include: { author: true }
  })

  return { feed: response, user: user };
};