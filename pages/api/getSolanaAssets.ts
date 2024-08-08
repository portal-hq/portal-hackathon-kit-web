import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const assetRes = await fetch(
    `https://api.portalhq.io/api/v3/clients/me/chains/${process.env.solanaChainId}/assets`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.portalClientApiKey}`,
      },
    },
  );

  res.json(await assetRes.json());
}
