import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const TestComponent = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Material UI Test
      </Typography>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </Box>
  );
};

export default TestComponent;