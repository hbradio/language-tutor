import { json } from '@sveltejs/kit'
import prisma from '$lib/prisma';
import stripe from '$lib/stripe';
import { STRIPE_WEBHOOK_SECRET } from '$env/static/private'

function toBuffer(ab: ArrayBuffer): Buffer {
	const buf = Buffer.alloc(ab.byteLength);
	const view = new Uint8Array(ab);
	for (let i = 0; i < buf.length; i++) {
		buf[i] = view[i];
	}
	return buf;
}

export async function POST(event) {
    // const body = await event.request.text();
    // const body = Buffer.from(await event.request.arrayBuffer())
    // const body = new Uint8Array(await event.request.arrayBuffer()) 
    // None of these work :-(
    // const stripeEvent = stripe.webhooks.constructEvent(body, event.request.headers.get('stripe-signature'), 'whsec_1dbe5e6bb6a61ec358625beef3bfe14885abd5585c4ae9feb60a83807c4d33d6')

    const stripePayload = await event.request.json()
    if (stripePayload.type === 'charge.succeeded') {
      const data = stripePayload.data.object
      console.log(data)
      const email = data.billing_details.email
      await prisma.user.update({
          where: {
              email,
          },
          data: {
              credits: {
                  increment: 5,
              },
          },
      })
    }
    return json({ success: true })
  }