import { ITokenBalance, usePortal } from '@/providers/portal';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Refresh, Token } from '@mui/icons-material';

export default function Home() {
  const portal = usePortal();
  const [tokens, setTokens] = useState<ITokenBalance[]>([]);
  const [tokensLoading, setTokensLoading] = useState(false);

  const loadTokens = async () => {
    setTokensLoading(true);
    const tokens = await portal.getSolanaTokenBalances();
    if (tokens) setTokens(tokens);
    setTokensLoading(false);
  };

  useEffect(() => {
    loadTokens();
  }, [portal.ready]);

  return (
    <Box>
      <Container maxWidth="lg">
        <Box
          sx={{
            p: 4,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography fontSize={{ xs: 12, md: 16 }}>
            Need SOL or PYUSD? Get them from their respective faucets -{' '}
            <Link href="https://faucet.solana.com/">Solana Faucet</Link> and{' '}
            <Link href="https://faucet.paxos.com/">Paxos Faucet</Link>
          </Typography>
        </Box>
        <Box>
          <Grid container>
            <Grid item xs={8}>
              <Typography textAlign="left" variant="h6" component={'h1'}>
                Tokens Held
              </Typography>
            </Grid>
            <Grid item xs={4} textAlign="right">
              <Button
                color="inherit"
                onClick={() => {
                  loadTokens();
                }}
                startIcon={<Refresh />}
              >
                Refresh
              </Button>
            </Grid>
          </Grid>
          <Box>
            <List sx={{ bgcolor: 'background.paper', p: { md: 4 } }}>
              {tokens.length && !tokensLoading ? (
                tokens
                  .map((token, idx) => {
                    return (
                      <ListItem key={idx}>
                        <ListItemAvatar>
                          <Avatar
                            alt={token.symbol}
                            src={token.metadata?.thumbnail as string}
                          >
                            {!token.metadata?.thumbnail ? <Token /> : <></>}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography fontSize={{ xs: 14, md: 16 }}>
                              {token.name}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              display={{ xs: 'none', md: 'block' }}
                              fontSize={12}
                            >
                              {token.metadata.tokenMintAddress}
                            </Typography>
                          }
                        />
                        <ListItemText
                          sx={{
                            textAlign: 'right',
                          }}
                          primary={
                            <Typography
                              fontSize={{ xs: 14, md: 20 }}
                              fontWeight={600}
                              color="primary"
                            >
                              <Typography
                                component="span"
                                fontSize={{ xs: 12, md: 16 }}
                              >
                                {token.symbol}{' '}
                              </Typography>
                              {`${Number(token.balance).toFixed(3)}`}
                            </Typography>
                          }
                        />
                      </ListItem>
                    );
                  })
                  .flatMap((item, idx) => {
                    if (idx === tokens.length - 1) {
                      return [item];
                    }
                    return [
                      item,
                      <Divider key={idx} variant="inset" component="li" />,
                    ];
                  })
              ) : (
                <ListItem sx={{ justifyContent: 'center' }}>
                  <CircularProgress />
                </ListItem>
              )}
            </List>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
