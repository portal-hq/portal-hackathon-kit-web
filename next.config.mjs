/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    portalClientApiKey: 'YOUR CLIENT API KEY',
    solanaChainId: 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
    solMint: 'So11111111111111111111111111111111111111112',
    pyUsdMint: 'CXk2AMBfi3TwaEL2468s6zP8xq9NxTXjp9gjMgzeUynM',
    solanaRpcUrl: 'https://api.devnet.solana.com',
  },
};

export default nextConfig;
