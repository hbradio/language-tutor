import Stripe from 'stripe';
import { STRIPE_API_KEY } from '$env/static/private'

const stripe = new Stripe(STRIPE_API_KEY, {
  apiVersion: '2020-08-27'
});

export default stripe;