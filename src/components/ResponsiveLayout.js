// src/app/components/ResponsiveLayout.js
import { Grid } from '@mui/material';

const ResponsiveLayout = ({ children }) => {
  return (
    <Grid container spacing={4} className="px-4">
      {children}
    </Grid>
  );
};

export default ResponsiveLayout;
