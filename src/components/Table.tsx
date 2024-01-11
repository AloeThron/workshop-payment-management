import { Customer } from "../types/customer";

type Props = {
    customers: Customer[]
};

export default function Table({customers}: Props) {
  return (
    <div>
      <h2 className="my-10 text-2xl font-bold">Customer Payment Record</h2>

      <table id="paymentTable" className="table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Metadata</th>
            <th>Verified</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.name}</td>
              <td>{customer.payment.amount}</td>
              <td>{customer.payment.type}</td>
              <td>{JSON.stringify(customer.payment.metadata)}</td>
              <td>{customer.isVerified ? `✅` : `❌`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
