import prisma from "$lib/prisma";
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ params: { id } }) => {
    const post = await prisma.post.findUniqueOrThrow({
        where: { id: BigInt(id) },
        include: { author: true },
    });

    return { post };
}) satisfies PageServerLoad;

export const actions = {
    deletePost: async ({ params: { id } }) => {
        await prisma.post.delete({
            where: { id: BigInt(id) },
        });

        throw redirect(303, '/')
    }
} satisfies Actions;
