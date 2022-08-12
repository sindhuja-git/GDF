import Fetch from '../../../utils/fetch';
import { getGroupAttachmentsData } from '../../api-urls';

const fetchGroupAttachmentInfo = async (obj) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await Fetch({
      url: getGroupAttachmentsData(obj.groupNumber, obj.launchId),
    });
  } catch (err) {
    throw err;
  }
};

export default fetchGroupAttachmentInfo;
