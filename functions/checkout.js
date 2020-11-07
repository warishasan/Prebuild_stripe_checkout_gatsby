const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
exports.handler = async (event, context) => {
  let reqObj = JSON.parse(event.body)

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{ price: reqObj.id, quantity: 1 }],
    mode: "payment",
    success_url: reqObj.success_url,
    cancel_url: reqObj.cancel_url,
  })

  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
