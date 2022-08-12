import React, { FC } from 'react';
import { gql, useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Typography from '@material-ui/core/Typography';

import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';
import SectionHeaderContainer from 'app/components/shared/SectionHeaderContainer';
import { SideSheetTab } from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchSideSheet';
import {
  GroupHeaderProps,
  // useGroupHeaderStyles,
} from 'app/Authenticated/screens/Group/screens/Launch/shared/useGroupHeaderStyles';
import { formatIsoStringToVernacularDateTime } from 'utils/date/helpers';
import SideSheetTabPanel from '../SideSheetTabPanel';

const GET_GROUP_COMMENTS_INFO = gql`
  query GetGroupCommentsInfo($groupId: String!) {
    group(id: $groupId) {
      comments {
        id
        text
        commentType {
          code
          name
        }
        createDate
        createUserName
        createUserDisplayName
      }
      launches(latest: true) {
        id
        effectiveDate
        launchDate
        launchComments {
          id
          text
          createDate
          createUserName
          createUserDisplayName
          commentType {
            code
            name
          }
        }
      }
    }
  }
`;

export type GroupCommentsQuery = {
  group: {
    comments: [
      {
        id: string;
        text: string;
        commentType: {
          code: string;
          name: string;
        };
        createDate: string;
        createUserName: string;
        createUserDisplayName: string;
      }
    ];
    launches: [
      {
        id: string;
        effectiveDate: string;
        launchDate: string;
        launchComments: [
          {
            id: string;
            text: string;
            createDate: string;
            createUserName: string;
            createUserDisplayName: string;
            commentType: {
              code: string;
              name: string;
            };
          }
        ];
      }
    ];
  };
};

const CommentsTabPanel: FC<GroupHeaderProps> = () => {
  // const classes = useGroupHeaderStyles();

  const { groupId } = useLaunchFormattedParams();
  const { loading, data, error } = useQuery<GroupCommentsQuery>(
    GET_GROUP_COMMENTS_INFO,
    {
      variables: { groupId },
    }
  );
  const comments = data?.group.launches[0].launchComments.filter(
    (c) => c.text !== ''
  );
  return (
    <>
      {loading && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {!loading && !error && (
        <>
          <SideSheetTabPanel title="Comments" value={SideSheetTab.Comments}>
            <div style={{ overflowY: 'auto', height: '100%' }}>
              <div
                className="launchComments"
                style={{ height: '45%', overflowY: 'scroll' }}
              >
                <div
                  style={{
                    position: 'fixed',
                    width: '100%',
                    paddingBottom: '38px',
                  }}
                >
                  <SectionHeaderContainer
                    header="Launch Comments"
                    paddingStyle={false}
                  />
                </div>
                <div>
                  {comments && comments.length > 0 ? (
                    comments.map((comment) => (
                      <React.Fragment key={comment.id}>
                        <div
                          style={{
                            paddingLeft: '5px',
                            paddingTop: '44px',
                          }}
                        >
                          {`[${formatIsoStringToVernacularDateTime(
                            comment.createDate
                          )} - ${comment.createUserDisplayName}]
                          ${comment.text}`}
                        </div>
                      </React.Fragment>
                    ))
                  ) : (
                    <div style={{ paddingLeft: '5px', paddingTop: '42px' }}>
                      No results found
                    </div>
                  )}
                </div>
              </div>
              <div
                className="groupComments"
                style={{
                  height: '55%',
                  overflowY: 'scroll',
                  paddingBottom: '100px',
                }}
              >
                <div
                  style={{
                    position: 'fixed',
                    width: '100%',
                    paddingBottom: '30px',
                  }}
                >
                  <SectionHeaderContainer
                    header="Group Comments"
                    paddingStyle={false}
                  />
                </div>
                <div style={{ paddingTop: '34px' }}>
                  {data && data.group.comments.length > 0 ? (
                    data.group.comments.map((comment: any) => (
                      <>
                        <br />
                        <div
                          data-testId="group-comments"
                          style={{ paddingLeft: '5px' }}
                        >
                          {`[${formatIsoStringToVernacularDateTime(
                            comment.createDate
                          )} - ${comment.createUserDisplayName}]
                          ${comment.text}`}
                        </div>
                      </>
                    ))
                  ) : (
                    <div style={{ paddingLeft: '5px', paddingTop: '15px' }}>
                      No results found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SideSheetTabPanel>
        </>
      )}
    </>
  );
};
export default CommentsTabPanel;
