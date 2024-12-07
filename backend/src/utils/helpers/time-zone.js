const moment = require("moment-timezone");

// Define the server's fixed timezone
const SERVER_TIMEZONE = "Asia/Bangkok"; // UTC+7

const timeZoneUtil = {
  /**
   * Convert a input time to the server's timezone (Asia/Bangkok).
   * @param {Date | string} utcTime - The UTC time to convert.
   * @returns {moment.Moment} The converted time in the server's timezone.
   */
  convertToServerTimezone: (inputDate) => {
    return moment(inputDate).tz("Asia/Bangkok");
  },

  /**
   * Get the current time in the server's timezone (UTC+7).
   * @returns {moment.Moment} The current time in the server's timezone.
   */
  getCurrentTimeInServerZone: () => {
    return moment().tz(SERVER_TIMEZONE);
  },

  /**
   * Convert a UTC time to the server's timezone (Asia/Bangkok).
   * @param {Date | string} utcTime - The UTC time to convert.
   * @returns {moment.Moment} The converted time in the server's timezone.
   */
  convertUtcToServerZone: (utcTime) => {
    return moment(utcTime).tz(SERVER_TIMEZONE, true); // 'true' keeps the time intact after conversion.
  },

  /**
   * Convert a time in the server's timezone (Asia/Bangkok) to UTC.
   * @param {Date | string} serverTime - The time in the server's timezone to convert.
   * @returns {moment.Moment} The converted time in UTC.
   */
  convertServerZoneToUtc: (serverTime) => {
    return moment.tz(serverTime, SERVER_TIMEZONE).utc(); // This step might not be necessary if you only need UTC+7.
  },

  /**
   * Get the start of the day in the server's timezone (Asia/Bangkok).
   * @param {Date | string} date - The date for which to calculate the start of the day.
   * @returns {moment.Moment} The start of the day in UTC+7.
   */
  getStartOfDayInServerZone: (date) => {
    return moment.tz(date, SERVER_TIMEZONE).startOf("day");
  },

  /**
   * Get the end of the day in the server's timezone (Asia/Bangkok).
   * @param {Date | string} date - The date for which to calculate the end of the day.
   * @returns {moment.Moment} The end of the day in UTC+7.
   */
  getEndOfDayInServerZone: (date) => {
    return moment.tz(date, SERVER_TIMEZONE).endOf("day");
  },
};

module.exports = timeZoneUtil;
