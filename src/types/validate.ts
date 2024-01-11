import { Customer, CustomerForm } from "./customer";
import { AllPament, AllPamentForm } from "./payment";

function assertNonEmpty(
  condition: unknown,
  message: string
): asserts condition {
  if (condition === null || condition === undefined || condition === "") {
    throw new Error(message);
  }
}

function assert(condition: boolean, message: string): asserts condition {
  if (condition === false) {
    throw new Error(message);
  }
}

export function validatePayment(payment?: AllPamentForm): AllPament {
  assertNonEmpty(payment, "Payment is required");
  assertNonEmpty(payment.amount, "Amount is required");

  const amount = parseInt(payment.amount);

//   assert(Number.isNaN(amount), "Amount must be a number");
  assert(amount > 0, "Amount must be greater than 0");

  assertNonEmpty(payment.type, "Type is required");

  if (payment.type === "CreditCard") {
    assertNonEmpty(payment.metadata, "Metadata is required");
    assertNonEmpty(payment.metadata.cardNumber, "Card Number is required");
    assertNonEmpty(
      payment.metadata.cardHolderName,
      "Card Holder Name is required"
    );

    return {
      type: payment.type,
      amount: amount,
      metadata: {
        cardNumber: payment.metadata.cardNumber,
        cardHolderName: payment.metadata.cardHolderName,
      },
    };
  }

  if (payment.type === "OnlineBanking") {
    assertNonEmpty(payment.metadata, "Metadata is required");
    assertNonEmpty(
      payment.metadata.accountNumber,
      "Account Number is required"
    );
    assertNonEmpty(payment.metadata.bankName, "Bank Number is required");

    return {
      type: payment.type,
      amount: amount,
      metadata: {
        accountNumber: payment.metadata.accountNumber,
        bankName: payment.metadata.bankName,
      },
    };
  }

  if (payment.type === "Cash") {
    return {
      type: payment.type,
      amount: amount,
      metadata: undefined,
    };
  }

  throw new Error("Invalid payment type");
}

export default function validateCustomer(customer: CustomerForm): Customer {
  assertNonEmpty(customer.name, "Name is required");
  assertNonEmpty(customer.isVerified, "isVerified is required");

  return {
    name: customer.name,
    isVerified: customer.isVerified,
    payment: validatePayment(customer.payment),
  };
}
