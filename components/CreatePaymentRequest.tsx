import { useState } from "react";
import { InvoiceData } from "../pages/api/invoice";

const CreatePaymentRequest: React.FC = () => {
  const [result, setResult] = useState<string>();
  const [error, setError] = useState<Error>();

  const [amount, setAmount] = useState(420);
  const [memo, setMemo] = useState("I'm a hacker now");

  async function fetchInvoice(e: React.FormEvent) {
    e.preventDefault();
    console.debug(amount);
    console.debug(memo);
    // return;
    setError(undefined);

    // return fetch(`https://${endpoint}:8080/v1/macaroon`, {
    //   method: "POST",
    //   body: JSON.stringify(invoicePermissions),
    //   headers: {
    //     "Grpc-Metadata-Macaroon": macaroonHex,
    //   },
    // });
    try {
      const res = await fetch("api/invoice", {
        method: "POST",
        body: JSON.stringify({ memo, value: amount }),
      });
      const { invoice, message }: InvoiceData = await res.json();
      if (invoice) {
        setResult(invoice);
      } else if (message) {
        throw new Error(message);
      }
    } catch (e) {
      setError(e as Error);
      console.error(e);
    }
  }

  return (
    <div>
      <form onSubmit={fetchInvoice}>
        <label>
          Memo
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </label>
        <label>
          Amount (sats)
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </label>
        <button type="submit">Create Payment Request</button>
      </form>
      {result && <textarea readOnly rows={5} value={result} />}
      {error && <mark>{error.message}</mark>}
    </div>
  );
};

export default CreatePaymentRequest;
