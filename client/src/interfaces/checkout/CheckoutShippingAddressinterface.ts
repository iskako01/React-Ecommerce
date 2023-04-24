import { CheckoutBillingAddressinterface } from "./CheckoutBillingAddressinterface";

export interface CheckoutShippingAddressinterface
  extends CheckoutBillingAddressinterface {
  isSameAddress: boolean;
}
