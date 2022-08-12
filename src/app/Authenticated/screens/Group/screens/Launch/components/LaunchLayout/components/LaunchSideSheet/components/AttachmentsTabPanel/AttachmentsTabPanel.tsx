import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Divider, Typography } from '@material-ui/core';
import { SideSheetTab } from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchSideSheet';
import { selectedAttachments } from 'app/Ducks/Attachments/selectors';
import SideSheetTabPanel from '../SideSheetTabPanel';

export type LaunchAttachmentItem = {
  name: string;
  downloadUrl: string;
};

const AttachmentsTabPanel: FC<{}> = () => {
  const groupAttachments = useSelector(selectedAttachments);
  return (
    <div>
      <>
        <SideSheetTabPanel
          title="Attachment Files"
          value={SideSheetTab.Attachments}
        >
          <div style={{ overflowY: 'auto', height: '100%' }}>
            {groupAttachments && groupAttachments.length > 0 ? (
              groupAttachments.map((att: any) => (
                <React.Fragment key={att.attachmentType.name}>
                  <br />
                  <Typography
                    variant="h5"
                    component="h5"
                    data-testId="group-attachments"
                    style={{ paddingLeft: '5px' }}
                  >
                    {att.attachmentType.name}
                  </Typography>
                  <div
                    data-testId="group-attachments"
                    style={{ paddingLeft: '5px' }}
                  >
                    <a href={att.downloadUrl}> {att.name}</a>
                  </div>
                  <br />
                  <Divider />
                </React.Fragment>
              ))
            ) : (
              <div style={{ paddingLeft: '5px' }}>
                No attachment files available
              </div>
            )}
          </div>
        </SideSheetTabPanel>
      </>
    </div>
  );
};
export default AttachmentsTabPanel;
