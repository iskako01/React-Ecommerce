import { FC } from "react";
import { FormikErrors, FormikTouched, getIn } from "formik";
import { CheckoutBillingAddressinterface } from "../../interfaces/checkout/CheckoutBillingAddressinterface";
import { checkoutInitialValuesInterface } from "../../interfaces/checkout/CheckoutInitialValuesInterface";
import { Box, TextField, useMediaQuery } from "@mui/material";

interface PropsInterface {
  type: string;
  values: CheckoutBillingAddressinterface;
  errors: FormikErrors<checkoutInitialValuesInterface>;
  touched: FormikTouched<checkoutInitialValuesInterface>;
  handleBlur: any;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
}

const AddressForm: FC<PropsInterface> = ({
  type,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const formattedName = (field) => `${type}.${field}`;

  const formattedError = (field) =>
    Boolean(
      getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))
    );
  const formattedHelper = (field) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

  return (
    <Box
      display="grid"
      gap="15px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{
        "& > div": { gridColumn: isNonMobile ? "" : "span 4" },
      }}
    >
      <TextField
        fullWidth
        type="text"
        label="First Nmae"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.firstName}
      />
    </Box>
  );
};

export default AddressForm;
