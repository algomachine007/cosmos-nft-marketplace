import type { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY ?? "");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { cart } = req.body;

  if (req.method === "POST") {
    try {
      if (cart !== "undefined") {
        const session = await stripe?.checkout?.sessions.create({
          payment_method_types: ["card"],
          line_items: [cart],
          mode: "payment",
          success_url: `http://localhost:3000/?success=true`,
          cancel_url: `http://localhost:3000/?canceled=true`,
        });

        const stripeHost = "checkout.stripe.com";
        const stripe_url = new URL(session.url).hostname;
        if (session.url && stripeHost === stripe_url) {
          res.redirect(303, String(session.url));
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
