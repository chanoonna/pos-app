export const createRequestTypeMap = <T extends string>(requestType: T) =>
  ({
    REQUEST: `${requestType}_REQUEST`,
    SUCCESS: `${requestType}_SUCCESS`,
    FAILURE: `${requestType}_FAILURE`
  } as const);
