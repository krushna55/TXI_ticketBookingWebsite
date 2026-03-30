export const isFuture = (
  show_time: string | null,
  showdate: string | null,
): boolean => {
  const date = new Date();
  if (!show_time || !showdate) return false;
  const [h, m] = show_time.split(":").map(Number);
  const [y, mo, d] = showdate.split("-").map(Number);
  const showMinutes = h * 60 + m;
  const nowMinutes = date.getHours() * 60 + date.getMinutes();
  const currentDay = date.getDate();

  return y > date.getFullYear()
    ? true
    : y < date.getFullYear()
      ? false
      : mo > date.getMonth() + 1
        ? true
        : mo < date.getMonth() + 1
          ? false
          : d > currentDay
            ? true
            : d < currentDay
              ? false
              : showMinutes > nowMinutes;
};
