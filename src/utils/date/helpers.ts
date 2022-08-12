import moment from 'moment';

export const formatIsoStringToVernacularDateTime = (
  dateString: string
): string => moment(dateString).format('MM/DD/YYYY hh:mmA');

export const formatIsoStringToVernacularDate = (dateString: string): string => {
  return moment(dateString).format('MM/DD/YYYY');
};
