import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Input from "@mui/material/Input";
import Card from "@mui/material/Card";
import { useState } from "react";
import { updateUsersApi } from "library/apis/user";
import { createPaymentIntent } from "library/apis/payment";
import MDTypography from "components/MDTypography";

const CheckoutForm = ({ method }) => {

    // collect data from the user
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // stripe items
    const stripe = useStripe();
    const elements = useElements();

    // main function
    const createSubscription = async () => {
        try {

            // create a payment method
            const paymentMethod = await stripe?.createPaymentMethod({
                type: "card",
                card: elements?.getElement(CardElement),
                billing_details: {
                    name,
                    email,
                },
            });

            console.log('PaymentMethod: ', paymentMethod);

            const paymentIntent = await createPaymentIntent({ amount: 30000, currency: 'usd', paymentMethodId: paymentMethod?.paymentMethod?.id });
            console.log('Payment Intent: ', paymentIntent);

            const updateUserData = {
                paymentMethod: paymentMethod?.paymentMethod?.id,
                expiredDate: new Date((new Date()).getTime() + (30 * 24 * 60 * 60 * 1000)),
            }

            console.log('UpdateUserData: ', updateUserData);

            let data = JSON.parse(localStorage.getItem('login user'));
            const userId = data?.data?._id;
            console.log('Login User Data: ', data?.data?._id);
            const result = await updateUsersApi(userId, updateUserData);
            console.log('Updated User Data:', result);

            // const confirmPayment = await stripe?.confirmCardPayment(clientSecret);

            // console.log('ConfirmPayment: ', confirmPayment);

            // if (confirmPayment?.error) {
            //     alert(confirmPayment.error.message);
            // } else {
            //     alert("Success! Check your email for the invoice.");
            // }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MDBox flexDirection="row" display="flex" justifyContent="center" alignItems="center">
            <MDBox
                width="70%"
                height="80vh"
                display="flex"
                flexDirection="column"
                pt={10}
            >
                <Card>
                    <MDBox
                        display="flex"
                        m={4}
                        flexDirection="column"
                        px={1.5}
                        gap={4} >
                        <MDTypography variant="h4">{method === 'montly' ? '20 $ / Month' : '200 $ / Annual'}</MDTypography>
                        <Card sx={{ padding: 3, backgroundColor: '#33CD5F' }}>
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '24px',
                                            color: '#ffffff',
                                            '::placeholder': {
                                                color: '#ffffff',
                                            },
                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }}
                            />
                        </Card>
                        <MDButton onClick={createSubscription} color="success" sx={{ height: '60px', fontSize: '20px' }}>
                            Pay Now
                        </MDButton>
                    </MDBox>
                </Card>
            </MDBox>
        </MDBox>
    );
}

export default CheckoutForm;