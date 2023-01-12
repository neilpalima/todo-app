import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Todos from './components/Todos';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Todo List
          </Typography>
          <Todos />
          {/* <Box sx={{ mt: 1, width: '100%' }}>
            <AddTodo />
          </Box>
          <Box sx={{ mt: 1, width: '100%' }}>
            <Todos />
          </Box> */}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
