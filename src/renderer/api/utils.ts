export const request = window.api.request;

export const createRequestActionMap = <T extends string>(requestType: T) =>
  ({
    REQUEST: `${requestType}_REQUEST`,
    SUCCESS: `${requestType}_SUCCESS`,
    FAILURE: `${requestType}_FAILURE`,
    CANCEL: `${requestType}_CANCEL`
  } as const);
