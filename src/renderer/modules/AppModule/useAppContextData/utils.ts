import type { Dispatch } from 'react';

interface SuccessPayload<T> {
  response: T;
}

interface FailurePayload {
  error: Error;
}

type HandleRequestActionArgs<
  RequestType,
  SuccessType,
  FailureType,
  SuccessResponse,
  RequestParams = undefined
> = RequestParams extends undefined
  ? {
      action: {
        REQUEST: RequestType;
        SUCCESS: SuccessType;
        FAILURE: FailureType;
      };
      params?: any;
      dispatch: Dispatch<
        | { type: RequestType }
        | { type: SuccessType; payload: SuccessPayload<SuccessResponse> }
        | { type: FailureType; payload: FailurePayload }
      >;
      request: (
        params?: RequestParams
      ) => Promise<{ response?: SuccessResponse; error?: Error }>;
      onSuccess?: ((response?: SuccessResponse) => void)[];
    }
  : {
      action: {
        REQUEST: RequestType;
        SUCCESS: SuccessType;
        FAILURE: FailureType;
      };
      params: RequestParams;
      dispatch: Dispatch<
        | { type: RequestType }
        | { type: SuccessType; payload: SuccessPayload<SuccessResponse> }
        | { type: FailureType; payload: FailurePayload }
      >;
      request: (
        params: RequestParams
      ) => Promise<{ response?: SuccessResponse; error?: Error }>;
      onSuccess?: ((response?: SuccessResponse) => void)[];
    };

export const handleRequestAction = async <
  RequestType,
  SuccessType,
  FailureType,
  SuccessResponse,
  RequestParams = undefined
>({
  action,
  params,
  dispatch,
  request,
  onSuccess
}: HandleRequestActionArgs<
  RequestType,
  SuccessType,
  FailureType,
  SuccessResponse,
  RequestParams
>) => {
  try {
    dispatch({ type: action.REQUEST });
    const { response, error } = await request(params);

    if (error) {
      dispatch({
        type: action.FAILURE,
        payload: { error }
      });
    } else if (response) {
      dispatch({
        type: action.SUCCESS,
        payload: { response }
      });

      if (onSuccess) {
        onSuccess.forEach((callback) => callback(response));
      }
    }
  } catch (error) {
    // TODO
    console.log(error);
  }
};
