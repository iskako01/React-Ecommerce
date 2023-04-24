import { CheckoutBillingAddressinterface } from "./CheckoutBillingAddressinterface";
import { CheckoutShippingAddressinterface } from "./CheckoutShippingAddressinterface";

export interface checkoutInitialValuesInterface {
  billingAddress: CheckoutBillingAddressinterface;
  shippingAddress: CheckoutShippingAddressinterface;
  email: string;
  phoneNumber: string;
}
