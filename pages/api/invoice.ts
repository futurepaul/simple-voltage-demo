async function getInvoice({
  endpoint,
  body,
  macaroonHex,
}: {
  endpoint: string;
  body: unknown;
  macaroonHex: string;
}) {
  return fetch(`https://${endpoint}:8080/v1/invoices`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Grpc-Metadata-Macaroon": macaroonHex,
    },
  });
}

import type { NextApiRequest, NextApiResponse } from "next";

export type InvoiceData = {
  invoice?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InvoiceData>
) {
  const endpoint = process.env.API_ENDPOINT!;
  const macaroonHex = process.env.INVOICE_MACAROON_HEX!;

  if (!endpoint || !macaroonHex) {
    res.status(500).json({ message: "Env variables not set" });
  }

  const { body } = req;

  try {
    const invRes = await getInvoice({
      endpoint,
      body: JSON.parse(body),
      macaroonHex,
    });
    // const { invoice } = await invRes.json();
    const { payment_request } = await invRes.json();
    console.log(payment_request);

    res.status(200).json({ invoice: payment_request });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}
