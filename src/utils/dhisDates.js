/**
 * Transform date into a DHIS2 Year-Month-Date dates format string.
 * @param {Date | null} date - The input date.
 * @returns {string | undefined} - The formatted date string or undefined if the input date is null.
 */
export const dhisDates = (date) => {
  if (!date) return;
  const dhis2DateFormat = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  return dhis2DateFormat;
};
