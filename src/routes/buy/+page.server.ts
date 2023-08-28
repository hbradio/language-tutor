import stripe from "$lib/stripe";
import prisma from "$lib/prisma";
import type { PageServerLoad, RequestEvent } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async (event) => {
  const session = await event.locals.getSession();
  if (!session?.user) throw redirect(303, "/auth/signin");

  const user: User = await prisma.user.findUnique({
    where: { email: session.user.email }
  })
}) satisfies PageServerLoad;

export const actions = {
    createCheckout: async (event: RequestEvent) => {
        const session = await event.locals.getSession();
        if (!session?.user) throw redirect(303, "/auth/signin");
        event.url.hostname

        const stripeSession = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Pack of 5 credits',
                    },
                    unit_amount: 500,
                    },
                    quantity: 1,
                },
            ],
            client_reference_id: session.user.email,
            customer_email: session.user.email,
            success_url: `${event.url.origin}/buy/success`,
            cancel_url: `${event.url.origin}`
        });
        throw redirect(303, stripeSession.url)
    }
} satisfies Actions;
