import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type ItemProps = {
  header: string;
  paddingStyle?: boolean;
  paddingBottom?: boolean;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '40px',
    background: theme.palette.secondary.main,
    alignItems: 'center',
    display: 'flex',
    padding: '10px',
  },
}));

const SectionHeaderContainer: FC<ItemProps> = (props) => {
  const { header, paddingStyle = true, paddingBottom = false } = props;
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      style={{
        marginTop: paddingStyle ? '10px' : 0,
        paddingBottom: paddingBottom ? '34px' : 0,
      }}
    >
      <Typography variant="h2" style={{ fontSize: '1.2rem' }}>
        {header}
      </Typography>
    </div>
  );
};

export default SectionHeaderContainer;
