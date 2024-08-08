import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = await fetch(
    `https://api.portalhq.io/api/v3/clients/me/chains/${process.env.solanaChainId}/assets/send/build-transaction`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.portalClientApiKey}`,
      },
      body: req.body,
    },
  );

  res.json(await data.json());
}
