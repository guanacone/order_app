const accountSid = '***REMOVED***';
const authToken = '***REMOVED***';
const client = require('twilio')(accountSid, authToken);


exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  console.log(body);
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
  const info = await client.messages.create({
    body: `Your order of ${body.total} has been placed.  ${body.order.map(item => `${item.name} - ${item.size}: ${item.price}  `)}.`,
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+50588090794',
  });
  console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};