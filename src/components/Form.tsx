import React, { Dispatch, SetStateAction, useState } from "react";
import "../css/style.css";
import "../css/table.css";
import validateCustomer from "../types/validate";
import { Customer } from "../types/customer";

type Props = {
  customers: Customer[];
  setCustomers: Dispatch<SetStateAction<Customer[]>>;
};

export default function Form({ customers, setCustomers }: Props) {
  const [cname, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("Cash");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setbankName] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [showMessage, setShowMessage] = useState({
    message: "Complete",
    type: "hide",
  });

  function setupForm(e: React.FormEvent) {
    e.preventDefault();

    try {
      const customer = validateCustomer({
        name: cname,
        payment: {
          type: paymentType,
          amount: amount,
          metadata: {
            cardNumber: cardNumber,
            cardHolderName: cardHolderName,
            accountNumber: accountNumber,
            bankName: bankName,
          },
        },
        isVerified: isVerified,
      });

      setCustomers([...customers, customer]);

      setShowMessage({
        message: "Submit Complete",
        type: "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        setShowMessage({ message: error.message, type: "error" });
      } else {
        setShowMessage({ message: String(error), type: "error" });
      }
    }
  }

  return (
    <div>
      <h1 className="my-14 text-4xl font-bold">Payment Management</h1>

      <form id="addCustomerForm">
        <div className="row-container">
          <p className="label">Customer Name</p>
          <input
            id="customerName"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="row-container">
          <p className="label">Amount</p>
          <input
            id="amount"
            type="text"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="row-container">
          <p className="label">Payment Method</p>
          <select
            name="payment"
            id="paymentType"
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <option value="Cash">Cash</option>
            <option value="OnlineBanking">Online Banking</option>
            <option value="CreditCard">Credit Card</option>
          </select>
        </div>
        <div
          id="creditCardMetadata"
          className={`nested ${paymentType === "CreditCard" ? "" : "hide"}`}
        >
          <div className="row-container">
            <p className="label">Card Number</p>
            <input
              id="cardNumber"
              type="text"
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className="row-container">
            <p className="label">Card Holder Name</p>
            <input
              id="cardHolderName"
              type="text"
              onChange={(e) => setCardHolderName(e.target.value)}
            />
          </div>
        </div>
        <div
          id="onlineBankingMetadata"
          className={`nested ${paymentType === "OnlineBanking" ? "" : "hide"}`}
        >
          <div className="row-container">
            <p className="label">Account Number</p>
            <input
              id="accountNumber"
              type="text"
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
          <div className="row-container">
            <p className="label">Bank Name</p>
            <input
              id="bankName"
              type="text"
              onChange={(e) => setbankName(e.target.value)}
            />
          </div>
        </div>
        <div className="row-container">
          <p className="label">Is Verified</p>
          <input
            type="checkbox"
            id="isVerified"
            onChange={(e) => setIsVerified(e.target.checked)}
          />
        </div>
        <div className="card">
          <button
            id="counter"
            type="submit"
            className="bg-blue-600 px-4 py-2 text-white font-semibold"
            onClick={setupForm}
          >
            Submit
          </button>
        </div>
      </form>

      <div id="message" className={`message ${showMessage.type}`}>
        {showMessage.message}
      </div>
    </div>
  );
}
