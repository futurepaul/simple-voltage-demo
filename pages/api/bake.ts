const invoicePermissions = {
  permissions: [
    {
      entity: "invoices",
      action: "read",
    },
    {
      entity: "invoices",
      action: "write",
    },
    {
      entity: "address",
      action: "read",
    },
    {
      entity: "address",
      action: "write",
    },
    {
      entity: "onchain",
      action: "read",
    },
  ],
};

async function bakeMacaroon({
  endpoint,
  macaroonHex,
}: {
  endpoint: string;
  macaroonHex: string;
}) {
  return fetch(`https://${endpoint}/v1/macaroon`, {
    method: "POST",
    body: JSON.stringify(invoicePermissions),
    headers: {
      "Grpc-Metadata-Macaroon": macaroonHex,
    },
  });
}

import type { NextApiRequest, NextApiResponse } from "next";

export type MacaroonData = {
  macaroon?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MacaroonData>
) {
  const endpoint = process.env.API_ENDPOINT!;
  const macaroonHex = process.env.ADMIN_MACAROON_HEX!;

  if (!endpoint || !macaroonHex) {
    res.status(500).json({ message: "Env variables not set" });
  }

  try {
    const macRes = await bakeMacaroon({ endpoint, macaroonHex });
    const { macaroon, message } = await macRes.json();

    if (message) {
      res.status(500).json({ message });
    } else {
      res.status(200).json({ macaroon });
    }
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}
