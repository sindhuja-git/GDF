export const selectedAttachments = ({ attachments }) => {
  return attachments.groupAttachments || null;
};

export const selectedGdfDocument = ({ attachments }) => {
  return attachments.gdfDocument || null;
};
