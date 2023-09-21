const express = require('express');
const stripe = require('stripe')('sk_test_51N7yKaCNUYXp5oILjqcGd4XXWrFD4PJRgEvdvPuegpmRQ1qcXa6246Sh40N2CgTOQjOSgLXNUVqCJ6rKLl7LtFcv00moqRKFgb');

export class PaymentController {
  createPaymentIntent = async (req, res) => {
    try {
      const data = req?.body;
      console.log('Data: ', data);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: data.amount,
        currency: data.currency,
        payment_method: data.paymentMethodId
      });
      console.log("PaymentIntent", paymentIntent);
      res.send({ data: paymentIntent });
    } catch (err) {
      console.log('Error: ', err);
      res.status(500).send({ err });
    }
  };
}
const paymentController = new PaymentController();

let router = express.Router();
router.post("/createPaymentIntent", paymentController.createPaymentIntent);

export default router;
