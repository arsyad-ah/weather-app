export function convertDatetimeToGMT(datetime: Date) {
  return new Date(datetime.getTime() + 8 * 60 * 60000);
}

export function convertDatetimeToUTC(datetime: Date) {
  return new Date(datetime.getTime() - 8 * 60 * 60000);
}

export function getNow() {
  const now = new Date();
  return now;
}
