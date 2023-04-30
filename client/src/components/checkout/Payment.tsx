import { FC } from "react";
import { FormikErrors, FormikTouched } from "formik";
import { CheckoutInitialValuesInterface } from "../../interfaces/checkout/CheckoutInitialValuesInterface";
import { Box, TextField, Typography } from "@mui/material";

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
}

const Payment: FC<PropsInterface> = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) => {
  return (
    <Box m="30px 0">
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Contact Information
        </Typography>
        <TextField
          fullWidth
          type="email"
          label="Email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          sx={{ gridColumn: "span 4", marginBottom: "15px" }}
        />
        <TextField
          fullWidth
          type="text"
          label="Phone Number"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phoneNumber}
          name="phoneNumber"
          error={!!touched.phoneNumber && !!errors.phoneNumber}
          helperText={touched.phoneNumber && errors.phoneNumber}
          sx={{ gridColumn: "span 4" }}
        />
      </Box>
    </Box>
  );
};

export default Payment;
