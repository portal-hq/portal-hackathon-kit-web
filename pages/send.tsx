import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { ITokenBalance, usePortal } from "@/providers/portal";
import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, Grid, TextField, Typography, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { useSnackbar } from "@/providers/snackbar";


export default function Home() {
  const portal = usePortal()
  const snackbar = useSnackbar()

  const [to, setTo] = useState('');
  const [tokenMint, setTokenMint] = useState(process.env.pyUsdMint || '');
  const [tokenAmount, setTokenAmount] = useState(0);
  const [tokens, setTokens] = useState<ITokenBalance[]>([])
  const [tokensLoading, setTokensLoading] = useState(false)
  const [txnOngoing, setTxnOngoing] = useState(false)

  const loadTokens = async () => {
    setTokensLoading(true)
    const tokens = await portal.getSolanaTokenBalances()
    if (tokens) setTokens(tokens)
    setTokensLoading(false)
  }

  useEffect(() => {
    loadTokens()
  }, [portal.ready])

  return (
    <Box>
      <Container maxWidth='lg'>
        <Box
          sx={{
            p: { lg: 8 },
            py: { lg: 16 },
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Grid container spacing={2} maxWidth={800}>
            <Grid item xs={12}>
              <TextField fullWidth label="To" variant="outlined" onChange={(e) => setTo(e.target.value)} />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>

                <InputLabel id="token-select-label">Token</InputLabel>
                <Select
                  labelId="token-select-label"
                  label="Token"
                  disabled={tokensLoading}
                  defaultValue={tokenMint}
                  onChange={(e) => setTokenMint(e.target.value)}
                >
                  {tokens.map((token, idx) => (
                    <MenuItem key={idx} value={token.metadata.tokenMintAddress}>
                      <Typography fontSize={12} color='primary'>
                        <Typography component='span' color='black' fontSize={18}>{token.symbol} </Typography>
                        {` ${Number(token.balance).toFixed(3)}`}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <TextField fullWidth label="Amount" variant="outlined" onChange={(e) => setTokenAmount(Number(e.target.value))} />
            </Grid>
            <Grid item xs={12}>
              <Button
                size="large"
                variant="outlined"
                disabled={txnOngoing || tokensLoading || !to || !tokenAmount || !tokenMint} onClick={async () => {
                  try {
                    setTxnOngoing(true)
                    const hash = await portal.sendTokensOnSolana(to, tokenMint, tokenAmount)

                    snackbar.setSnackbarOpen(true)
                    snackbar.setSnackbarContent({
                      severity: 'success',
                      message: `Sent tokens successfully. Transaction hash - ${hash}`
                    })
                  } catch (e) {
                    snackbar.setSnackbarOpen(true)
                    snackbar.setSnackbarContent({
                      severity: 'error',
                      message: `Something went wrong - ${e}`
                    })
                  } finally {
                    setTxnOngoing(false)
                  }
                }}>
                Send Token
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>

  )
}
