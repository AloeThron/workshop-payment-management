import "./css/style.css";
import "./css/table.css";
import { Customer } from "./types/customer";
import Form from "./components/Form";
import Table from "./components/Table";
import { useState } from "react";

function App() {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      name: "S",
      payment: {
        type: "Cash",
        amount: 100,
        metadata: undefined,
      },
      isVerified: false,
    },
    {
      name: "R",
      payment: {
        type: "Cash",
        amount: 100,
        metadata: undefined,
      },
      isVerified: true,
    },
  ]);

  return (
    <>
      <div id="app">
        <Form customers={customers} setCustomers={setCustomers} />
        <hr />
        <Table customers={customers} />
      </div>
    </>
  );
}

export default App;
