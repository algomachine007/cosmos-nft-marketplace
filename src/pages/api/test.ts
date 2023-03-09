const sgMail = require("@sendgrid/mail");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

export default async function handler(req: any, res: any) {
  client.messages
    .create({
      body: "Hello from twilio-node",
      to: "+2347049646171", // Text this number
      from: "+234 703 741 3090", // From a valid Twilio number
    })
    .then((message: any) => console.log(message.sid));

  res.send("Ok");

  //Sendgrid
  // (async () => {
  //   try {
  //     sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? "");
  //     const msg = {
  //       to: "uzochukwubenamara@gmail.com",
  //       from: "benneth@bejamas.io",
  //       subject: "Sending with Twilio SendGrid is Fun",
  //       text: "and easy to do anywhere, even with Node.js",
  //       html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  //     };

  //     await sgMail.send(msg);
  //     console.log(msg);
  //     console.log(sgMail);
  //     res.send("ok");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // })();
}

//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
