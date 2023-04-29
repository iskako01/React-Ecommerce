import { useState } from "react";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { shades } from "../../theme";
import { useAppSelector } from "../../composables/useAppSelector";
import { checkoutSchema } from "../../Schema";
import Shipping from "./Shipping";
import { checkoutInitialValuesInterface } from "../../interfaces/checkout/CheckoutInitialValuesInterface";

const checkoutInitialValues: checkoutInitialValuesInterface = {
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

  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (value, actions) => {
    setActiveStep(activeStep + 1);
    console.log(value, actions);
  };

  const makePayment = (values) => {
    console.log(values);
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
            <form>
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
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Checkout;
