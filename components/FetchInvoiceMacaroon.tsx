import { useState } from "react";
import { MacaroonData } from "../pages/api/bake";

const FetchInvoiceMacaroon: React.FC = () => {
  const [result, setResult] = useState<string>();
  const [error, setError] = useState<Error>();

  async function fetchMac() {
    setError(undefined);
    try {
      const res = await fetch("api/bake");
      const { macaroon, message }: MacaroonData = await res.json();
      if (macaroon) {
        setResult(macaroon);
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
      <button onClick={fetchMac}>Fetch Invoice Macaroon</button>
      {result && (
        <div>
          <textarea
            readOnly
            rows={5}
            value={`INVOICE_MACAROON_HEX=${result}`}
          />
          <p>
            Copy this macaroon and paste it into your <code>.env.local</code>,
            then restart the server.
          </p>
        </div>
      )}
      {error && <mark>{error.message}</mark>}
    </div>
  );
};

export default FetchInvoiceMacaroon;
