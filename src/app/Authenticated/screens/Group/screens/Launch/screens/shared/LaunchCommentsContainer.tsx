import React, { FC } from 'react';
import ListItemContainer from 'app/components/shared/ListItemContainer';
import { formatIsoStringToVernacularDateTime } from 'utils/date/helpers';
import { isEmpty } from 'utils/isEmpty';

export type Comment = {
  text: string;
  createDate: string;
  createUser: string;
  createUserDisplayName: string;
};

export type ItemProps = {
  comments: Comment[];
};

const LaunchCommentsContainer: FC<ItemProps> = (props) => {
  const { comments } = props;
  return (
    <ListItemContainer
      header="Comments"
      referentialData
      value={
        !isEmpty(comments)
          ? comments.map((c: Comment) => {
              return c.text !== '' ? (
                <>
                  <div
                    style={{
                      paddingLeft: '5px',
                      paddingTop: '5px',
                    }}
                  >
                    {`[${formatIsoStringToVernacularDateTime(c.createDate)}  ${
                      c.createUserDisplayName || c.createUser
                    }]
                  ${c.text}`}
                  </div>
                </>
              ) : (
                <div style={{ paddingLeft: '5px' }}>No results found</div>
              );
            })
          : ''
      }
    />
  );
};

export default LaunchCommentsContainer;
