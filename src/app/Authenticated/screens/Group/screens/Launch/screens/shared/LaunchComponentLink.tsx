/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Link } from '@material-ui/core';

// import { useLocation } from 'react-router-dom';

const VALID_UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
const VALID_LAUNCH_ID = /^\d{9}$/;

export const validOrEmpty = (value: string, regex: RegExp) =>
  value.match(regex) ? value : '';

export const getLinkUrl = (pathArray: Array<string>, isPlansLink: boolean) =>
  `/groups/${validOrEmpty(
    pathArray[2],
    VALID_UUID_REGEX
  )}/launches/${validOrEmpty(pathArray[4], VALID_LAUNCH_ID)}/${
    isPlansLink ? 'plans' : 'rates'
  }`;

const LaunchComponentLink: FC<{ isPlansLink?: boolean }> = ({
  isPlansLink = false,
}) => {
  const navigate = useNavigate();
  const { pathname } = window.location;
  const linkUrl = getLinkUrl(pathname.split('/'), isPlansLink);
  const useStyles = makeStyles(() => ({
    padding: {
      padding: '8px 8px 8px 0',
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.padding}>
      <Link
        component="button"
        className={classes.padding}
        onClick={() => {
          navigate(linkUrl, {
            replace: true,
          });
        }}
      >
        {isPlansLink ? 'Plans' : 'Rates'}
      </Link>
    </div>
  );
};

export default LaunchComponentLink;
