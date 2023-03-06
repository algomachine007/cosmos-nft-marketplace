import { NextApiRequest, NextApiResponse } from "next";
const nodemailer = require("nodemailer");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  console.dir(req.body, { depth: null });
  const email = req?.body.data?.object.email;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const totalItemsPrice = Number(req?.body.data?.object.amount).toFixed(2);

  let totalAmount = totalItemsPrice.split("");

  totalAmount.splice(totalAmount.length - 1).join("");

  const totalPrice = formatter.format(Number(totalAmount.join("")));

  //1. check webhook event
  //2. send data based on this event to an email
  try {
    if (req.method === "POST") {
      let testAccount = await nodemailer.createTestAccount();

      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      let info = await transporter.sendMail({
        from: String(email), // sender address
        to: String(email), // list of receivers
        subject: "Product purchased successfully  ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>Total items purchased ${totalPrice} </b>`, // html body
        attachments: [
          {
            filename: "hello.json",
            content: JSON.stringify({
              name: "Hello World!",
            }),
          },
        ],
      });

      console.log("Message sent: %s", info.messageId);

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      return info;
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
      res.end();
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

//http://6648-197-210-77-118.ngrok.io/api/mailer

//WEBHOOK_SECRET: whsec_a961a0565784e89a1374c6ce979b01639cf53ae4746bdfd45a768009abd27e0f
