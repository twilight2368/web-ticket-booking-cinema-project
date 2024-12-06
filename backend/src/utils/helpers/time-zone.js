const moment = require("moment-timezone");

// Define the server's fixed timezone
const SERVER_TIMEZONE = "Asia/Bangkok"; // UTC+7

const timeZoneUtil = {
  /**
   * Get the current time in the server's timezone (UTC+7).
   * @returns {moment.Moment} The current time in the server's timezone.
   */
  getCurrentTimeInServerZone: () => {
    return moment().tz(SERVER_TIMEZONE);
  },

  /**
   * Convert a UTC time to the server's timezone.
   * @param {Date | string} utcTime - The UTC time to convert.
   * @returns {moment.Moment} The converted time in the server's timezone.
   */
  convertUtcToServerZone: (utcTime) => {
    return moment(utcTime).tz(SERVER_TIMEZONE);
  },

  /**
   * Convert a time in the server's timezone to UTC.
   * @param {Date | string} serverTime - The time in the server's timezone to convert.
   * @returns {moment.Moment} The converted time in UTC.
   */
  convertServerZoneToUtc: (serverTime) => {
    return moment.tz(serverTime, SERVER_TIMEZONE).utc();
  },

  /**
   * Get the start of the day in the server's timezone and convert to UTC.
   * @param {Date | string} date - The date for which to calculate the start of the day.
   * @returns {moment.Moment} The start of the day in UTC.
   */
  getStartOfDayInUtc: (date) => {
    return moment.tz(date, SERVER_TIMEZONE).startOf("day").utc();
  },

  /**
   * Get the end of the day in the server's timezone and convert to UTC.
   * @param {Date | string} date - The date for which to calculate the end of the day.
   * @returns {moment.Moment} The end of the day in UTC.
   */
  getEndOfDayInUtc: (date) => {
    return moment.tz(date, SERVER_TIMEZONE).endOf("day").utc();
  },
};

module.exports = timeZoneUtil;
