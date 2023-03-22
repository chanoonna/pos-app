import type { Dispatch } from 'react';

interface SuccessPayload<T> {
  response: T;
}

interface FailurePayload {
  error: string;
}

interface IAction<T, V, R> {
  REQUEST: T;
  SUCCESS: V;
  FAILURE: R;
}

type IOnSuccess<T> = (response?: T) => void;

type IDispatch<T, V, R, K> = Dispatch<
  | { type: T }
  | { type: V; payload: SuccessPayload<K> }
  | { type: R; payload: FailurePayload }
>;

export async function handleRequestAction<
  RequestType,
  SuccessType,
  FailureType,
  SuccessResponse,
  RequestParams
>(args: {
  action: IAction<RequestType, SuccessType, FailureType>;
  dispatch: IDispatch<RequestType, SuccessType, FailureType, SuccessResponse>;
  request: (
    params: RequestParams
  ) => Promise<{ response?: SuccessResponse; error?: string }>;
  params: RequestParams;
  onSuccess?: IOnSuccess<SuccessResponse>[];
}): Promise<void>;
// without params, with response
export async function handleRequestAction<
  RequestType,
  SuccessType,
  FailureType,
  SuccessResponse
>({
  action,
  dispatch,
  request,
  onSuccess
}: {
  action: IAction<RequestType, SuccessType, FailureType>;
  dispatch: IDispatch<RequestType, SuccessType, FailureType, SuccessResponse>;
  request: () => Promise<{ response?: SuccessResponse; error?: string }>;
  onSuccess?: IOnSuccess<SuccessResponse>[];
}): Promise<void>;
// with params, with response
export async function handleRequestAction<
  RequestType,
  SuccessType,
  FailureType,
  SuccessResponse,
  RequestParams
>({
  action,
  dispatch,
  request,
  params,
  onSuccess
}: {
  action: IAction<RequestType, SuccessType, FailureType>;
  dispatch: IDispatch<RequestType, SuccessType, FailureType, SuccessResponse>;
  request: (
    params?: RequestParams
  ) => Promise<{ response?: SuccessResponse; error?: string }>;
  params?: RequestParams;
  onSuccess?: ((response?: SuccessResponse) => void)[];
}): Promise<void> {
  try {
    dispatch({ type: action.REQUEST });
    const { response, error } = await (params ? request(params) : request());

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
}
