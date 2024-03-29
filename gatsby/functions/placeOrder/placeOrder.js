const nodemailer = require('../../node_modules/nodemailer');

const generateOrderEmail = ({ order, total }) => {
  return `<div>
    <h2>Your Recent Order for ${total}</h2>
    <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
    <ul>
      ${order
    .map(
      (item) => `<li>
        <img src="${item.thumbnail}" alt="${item.name}"/>
        ${item.size} ${item.name} - ${item.price}
      </li>`,
    )
    .join('')}
    </ul>
    <p>Your total is <strong>${total}</strong> due at pickup</p>
    <style>
        ul {
          list-style: none;
        }
    </style>
  </div>`;
};

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event) => {
  const { body } = JSON.parse(event.body);

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

  // send the email
  const info = await transporter.sendMail({
    from: 'Gilles Rusca <rusca.webdev@gmail.com>',
    to: `${body.name} <${body.email}>`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
