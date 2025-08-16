import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Brayan Espinoza T-Shirt',
            },
            unit_amount: 2500, // $25.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'No se pudo crear la sesión' });
  }
});

app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});
