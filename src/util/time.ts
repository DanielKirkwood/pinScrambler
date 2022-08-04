export function getTimeDiff(startDate: Date, endDate: Date) {
  // if you want seconds then divide by 1000
  // const msInSecond = 1000

  return Math.abs(endDate.getTime() - startDate.getTime())
}
