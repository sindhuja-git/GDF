import React, { FC } from 'react';

import { SideSheetTab } from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchSideSheet';
import SideSheetTabPanel from '../SideSheetTabPanel';

const FilesTabPanel: FC<{}> = () => (
  <SideSheetTabPanel title="Files" value={SideSheetTab.Files}>
    <div>Files Content</div>
  </SideSheetTabPanel>
);

export default FilesTabPanel;
