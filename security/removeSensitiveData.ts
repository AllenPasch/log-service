import { LogType } from "../schema/Log";

/**
 * @see https://stackoverflow.com/a/6640851
 */
export const UUID_REGEX =
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

/**
 * Remove sensitive data from a log, before it gets stored.
 *
 * This code assumes UUIDs are used for IDs (e.g. for user IDs) across our services.
 */
export const removeSensitiveData = (log: LogType) => {
  const logSensitiveDataRemoved = {
    ...log,
    message: log.message?.replace(UUID_REGEX, "[...]"),
  };
  delete logSensitiveDataRemoved.patient_id;

  return logSensitiveDataRemoved;
};
