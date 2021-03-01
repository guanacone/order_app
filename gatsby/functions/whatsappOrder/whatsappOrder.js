const TwilioAccountSid = process.env.TwilioAccountSid;
const TwilioAuthToken = process.env.TwilioAuthToken;
const client = require('../../node_modules/twilio')(TwilioAccountSid, TwilioAuthToken);


exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  // Validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'You need to order at least one pizza',
      }),
    };
  }
  await client.messages.create({
    body: `Your order of ${body.total} has been placed.  ${body.order.map(item => `${item.name} - ${item.size}: ${item.price}  `)}.`,
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+50588090794',
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};