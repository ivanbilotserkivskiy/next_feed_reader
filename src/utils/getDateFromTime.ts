import moment from "moment"

export const getDateFromTime = (time?: string) => {
  return moment(time).format('DD MMM YYYY')
}