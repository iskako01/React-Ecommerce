import { CheckoutBillingAddressinterface } from "./CheckoutBillingAddressinterface";
import { CheckoutShippingAddressinterface } from "./CheckoutShippingAddressinterface";

export interface CheckoutInitialValuesInterface {
  billingAddress: CheckoutBillingAddressinterface;
  shippingAddress: CheckoutShippingAddressinterface;
  email: string;
  phoneNumber: string;
}
