import React, { FC } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const PlanTypePresentCard: FC<{
  planTypePresent?: Boolean;
  cardHeader: string;
  planTypeName: string;
}> = ({ planTypePresent, cardHeader, planTypeName }) => {
  return (
    <>
      <Typography
        gutterBottom
        variant="h3"
        component="h3"
        style={{ marginTop: '8px' }}
      >
        {cardHeader}
      </Typography>
      <Card variant="outlined">
        <CardContent>
          <div style={{ fontWeight: 'bold' }}>
            Are there any {planTypeName} Plans?
          </div>
          <Typography color="textSecondary" gutterBottom>
            {planTypePresent ? 'Yes' : 'No'}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default PlanTypePresentCard;
