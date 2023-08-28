
# My Template App

My SvelteKit template app. Deploy to [Vercel](https://vercel.com) for greatest success. Works well with [Cockroachdb](https://www.cockroachlabs.com/).

## Run locally
```
# Supply secrets
cdp .env.example .env

# Install
npm install -g pnpm
pnpm install

# Run locally
pnpm run dev

# Interact with the db
npx prisma migrate dev --name init
npx prisma studio

# Simulate Stripe events
stripe login
stripe listen --forward-to localhost:5173/webhooks/stripe
stripe trigger payment_intent.succeeded
```

## References
* https://www.prisma.io/blog/sveltekit-prisma-kvCOEoeQlC