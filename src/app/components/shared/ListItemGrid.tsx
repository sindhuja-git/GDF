import React, { FC } from 'react';

import Grid, { GridProps } from '@material-ui/core/Grid';

const ListItemGrid: FC<GridProps> = ({ children, ...other }) => (
  <Grid container spacing={2} {...other}>
    {children}
  </Grid>
);

export default ListItemGrid;
