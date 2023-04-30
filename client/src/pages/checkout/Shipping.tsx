import { FC } from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { CheckoutInitialValuesInterface } from "../../interfaces/checkout/CheckoutInitialValuesInterface";
import { FormikErrors, FormikTouched } from "formik";
import AddressForm from "../../components/checkout/AddressForm";

interface PropsInterface {
  values: CheckoutInitialValuesInterface;
  errors: FormikErrors<CheckoutInitialValuesInterface>;
  touched: FormikTouched<CheckoutInitialValuesInterface>;
  handleBlur: any;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

const Shipping: FC<PropsInterface> = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  const handleCheckboxChange = () => {
    setFieldValue(
      "shippingAddress.isSameAddress",
      !values.shippingAddress.isSameAddress
    );
  };

  return (
    <Box m="30px auto">
      <Box>
        <Typography>Billing Information</Typography>
        <AddressForm
          type="billingAddress"
          values={values.billingAddress}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Box>

      <Box mb="20px">
        <FormControlLabel
          label="Same for Shipping Address"
          control={
            <Checkbox
              defaultChecked
              value={values.shippingAddress.isSameAddress}
              onChange={() => handleCheckboxChange}
            />
          }
        />
      </Box>

      {!values.shippingAddress.isSameAddress && (
        <Box>
          <Typography>Shipping Information</Typography>
          <AddressForm
            type="shippingAddress"
            values={values.shippingAddress}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default Shipping;
