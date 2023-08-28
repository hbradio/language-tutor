import prisma from "$lib/prisma";
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

let user;

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.getSession();
  if (!session?.user) throw redirect(303, "/auth/signin");
  user = session.user
};

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        if (user.credits < 1) {
            throw redirect(303, `/buy`)
        }

        let title = data.get("title")
        let content = data.get("content")

        if (!title || !content) {
            return fail(400, { content, authorEmail, title, missing: true });
        }

        if (typeof title != "string" || typeof content != "string") {
            return fail(400, { incorrect: true })
        }

        await prisma.post.create({
            data: {
                title,
                content,
                published: true,
                author: { connect: { email: user.email } }  
            }
        });

        await prisma.user.update({
            where: {
                email: user.email,
            },
            data: {
                credits: {
                    decrement: 1,
                },
            },
        })

        throw redirect(303, `/`)
    }
} satisfies Actions;