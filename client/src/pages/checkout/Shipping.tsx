import { FC } from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { checkoutInitialValuesInterface } from "../../interfaces/checkout/CheckoutInitialValuesInterface";
import { FormikErrors, FormikTouched } from "formik";

interface PropsInterface {
  values: checkoutInitialValuesInterface;
  errors: FormikErrors<checkoutInitialValuesInterface>;
  touched: FormikTouched<checkoutInitialValuesInterface>;
  handleBlur: any;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

const Shipping: FC<PropsInterface> = () => {
  return <div>Shipping</div>;
};

export default Shipping;
