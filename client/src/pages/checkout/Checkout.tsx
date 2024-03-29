import { useState } from "react";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { loadStripe } from "@stripe/stripe-js";
import { shades } from "../../theme";
import { useAppSelector } from "../../composables/useAppSelector";
import { checkoutSchema } from "../../Schema";
import { CheckoutInitialValuesInterface } from "../../interfaces/checkout/CheckoutInitialValuesInterface";
import { useCreateOrdersMutation } from "../../store/api";
import Shipping from "./Shipping";
import Payment from "../../components/checkout/Payment";

const stripePromise = loadStripe(
  "pk_test_51LMVXHFD8JJ5hOZCagmJAU5jDXwDst89ZH1uAGDAYytx8DpU9KKHWO8VRsilS6qWq9PKn1g5fBBceiJVJhGtMw3x00EFhasQqi"
);

const checkoutInitialValues: CheckoutInitialValuesInterface = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useAppSelector((state) => state.cart.cart);

  const [createOrders, response] = useCreateOrdersMutation();

  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (
    values: CheckoutInitialValuesInterface,
    actions: any
  ) => {
    setActiveStep(activeStep + 1);

    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };

  const makePayment = async (values: CheckoutInitialValuesInterface) => {
    const stripe = await stripePromise;

    const requestBody = {
      userName: [
        values.billingAddress.firstName,
        values.billingAddress.lastName,
      ].join(" "),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };

    // TODO fix it
    const body = JSON.stringify(requestBody);

    createOrders(body).then(() => {
      const session = response.data;

      stripe?.redirectToCheckout({
        sessionId: session.id,
      });
    });

    console.log(response, body, requestBody);
  };

  return (
    <Box width="100%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={checkoutInitialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleSubmit,
            handleChange,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}

              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
              )}

              <Box display="flex" justifyContent="space-between" gap="50px">
                {!isSecondStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "#FFFFFF",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "#FFFFFF",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}
                >
                  {isFirstStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Checkout;
