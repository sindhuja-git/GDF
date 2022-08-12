import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useGroupHeaderStyles = makeStyles(() => {
  return createStyles({
    groupRep: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
      display: 'block',
      padding: '5px 5px 5px 5px',
    },
    groupRepLabel: {
      width: 'max-content',
    },
  });
});

export interface GroupHeaderProps {
  className?: string;
}
