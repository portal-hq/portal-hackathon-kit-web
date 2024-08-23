import { ITokenBalance, usePortal } from '@/providers/portal';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackbar } from '@/providers/snackbar';

export default function Home() {
  const portal = usePortal();
  const snackbar = useSnackbar();

  const [to, setTo] = useState('');
  const [tokenMint, setTokenMint] = useState(process.env.pyusdMint || '');
  const [tokenAmount, setTokenAmount] = useState(0);
  const [tokens, setTokens] = useState<ITokenBalance[]>([]);
  const [tokensLoading, setTokensLoading] = useState(false);
  const [txnOngoing, setTxnOngoing] = useState(false);

  const loadTokens = async () => {
    try {
      setTokensLoading(true);
      const tokens = await portal.getSolanaTokenBalances();
      if (tokens) setTokens(tokens);
    } catch (e) {
      snackbar.setSnackbarOpen(true);
      snackbar.setSnackbarContent({
        severity: 'error',
        message: `Something went wrong - ${e}`,
      });
    } finally {
      setTokensLoading(false);
    }
  };

  useEffect(() => {
    loadTokens();
  }, [portal.ready]);

  return (
    <Box>
      <Container maxWidth="lg">
        <Box
          sx={{
            p: { md: 8 },
            py: { xs: 8, md: 16 },
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Grid container spacing={{ xs: 0.5, md: 2 }} maxWidth={800}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="To"
                variant="outlined"
                onChange={(e) => setTo(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="token-select-label">Token</InputLabel>
                <Select
                  labelId="token-select-label"
                  label="Token"
                  disabled={tokensLoading}
                  defaultValue={tokenMint}
                  onChange={(e) => setTokenMint(e.target.value)}
                >
                  {tokens
                    .filter(
                      (token) =>
                        token.metadata.tokenMintAddress !== process.env.solMint,
                    )
                    .map((token, idx) => (
                      <MenuItem
                        key={idx}
                        value={token.metadata.tokenMintAddress}
                      >
                        <Typography
                          fontSize={{ xs: 8, md: 12 }}
                          color="primary"
                        >
                          <Typography
                            component="span"
                            color="black"
                            fontSize={{ xs: 12, md: 18 }}
                          >
                            {token.symbol}{' '}
                          </Typography>
                          {` ${Number(token.balance).toFixed(3)}`}
                        </Typography>
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Amount"
                variant="outlined"
                onChange={(e) => setTokenAmount(Number(e.target.value))}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                size="large"
                variant="outlined"
                disabled={
                  txnOngoing ||
                  tokensLoading ||
                  !to ||
                  !tokenAmount ||
                  !tokenMint
                }
                onClick={async () => {
                  try {
                    setTxnOngoing(true);
                    const hash = await portal.sendTokensOnSolana(
                      to,
                      tokenMint,
                      tokenAmount,
                    );

                    snackbar.setSnackbarOpen(true);
                    snackbar.setSnackbarContent({
                      severity: 'success',
                      message: `Sent tokens successfully. Transaction hash - ${hash}`,
                    });
                  } catch (e) {
                    snackbar.setSnackbarOpen(true);
                    snackbar.setSnackbarContent({
                      severity: 'error',
                      message: `Something went wrong - ${e}`,
                    });
                  } finally {
                    setTxnOngoing(false);
                  }
                }}
              >
                Send Token
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
