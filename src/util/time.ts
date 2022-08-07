export function getTimeDiffMs(startDate: Date, endDate: Date) {
  return endDate.getTime() - startDate.getTime()
}

export function getTimeDiffSec(startDate: Date, endDate: Date) {
  return (endDate.getTime() - startDate.getTime()) / 1000
}
