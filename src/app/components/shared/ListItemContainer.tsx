/* eslint-disable no-nested-ternary */
import React, { FC } from 'react';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type ItemProps = {
  header: string;
  value: any;
  backgroundHighlight?: boolean;
  referentialData?: boolean;
  id?: string;
  valueId?: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: '0',
  },
  inline: {
    display: 'inline',
  },
  backgroundHighlight: {
    backgroundColor: theme.palette.warning.main,
  },
  referentialData: {
    fontStyle: 'italic',
    color: '#72757e',
    fontWeight: 'normal!important' as any,
  },
}));

const ListItemContainer: FC<ItemProps> = (props) => {
  const {
    header,
    value,
    backgroundHighlight,
    referentialData,
    id,
    valueId,
  } = props;
  const classes = useStyles();
  return (
    <List className={classes.root}>
      <ListItem
        alignItems="flex-start"
        className={
          backgroundHighlight
            ? `background-highlight ${classes.backgroundHighlight}`
            : referentialData
            ? classes.referentialData
            : ''
        }
      >
        <ListItemText
          primary={header}
          secondary={
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
              id={valueId}
            >
              {value}
            </Typography>
          }
          id={id}
        />
      </ListItem>
    </List>
  );
};

export default ListItemContainer;
