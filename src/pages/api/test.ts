const sgMail = require("@sendgrid/mail");

export default async function handler(req: any, res: any) {
  //ES8
  (async () => {
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? "");
      const msg = {
        to: "benneth@bejamas.io",
        from: "benneth@bejamas.io",
        subject: "Sending with Twilio SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
      };

      await sgMail.send(msg);
      console.log(msg);
      console.log(sgMail);
      res.send("ok");
    } catch (error) {
      console.error(error);
    }
  })();
}

//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
