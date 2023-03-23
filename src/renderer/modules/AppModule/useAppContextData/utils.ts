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
  | { type: V; payload?: SuccessPayload<K> }
  | { type: R; payload: FailurePayload }
>;
type DispatchWithResponse<T, V, R, K> = Dispatch<
  | { type: T }
  | { type: V; payload: SuccessPayload<K> }
  | { type: R; payload: FailurePayload }
>;
type DispatchWitoutResponse<T, V, R> = Dispatch<
  { type: T } | { type: V } | { type: R; payload: FailurePayload }
>;

type RequestResponse<T> = Promise<{ response?: T; error?: string }>;
type RequestFunction<T, K> = (params: T) => RequestResponse<K>;

// with params, with response
export async function handleRequestAction<
  RequestType,
  SuccessType,
  FailureType,
  SuccessResponse,
  RequestParams
>(args: {
  action: IAction<RequestType, SuccessType, FailureType>;
  dispatch: DispatchWithResponse<
    RequestType,
    SuccessType,
    FailureType,
    SuccessResponse
  >;
  request: RequestFunction<RequestParams, SuccessResponse>;
  params: RequestParams;
  onSuccess?: IOnSuccess<SuccessResponse>[];
}): Promise<void>;
// with params, without response
export async function handleRequestAction<
  RequestType,
  SuccessType,
  FailureType,
  RequestParams
>(args: {
  action: IAction<RequestType, SuccessType, FailureType>;
  dispatch: DispatchWitoutResponse<RequestType, SuccessType, FailureType>;
  request: RequestFunction<RequestParams, undefined>;
  params: RequestParams;
  onSuccess?: IOnSuccess<undefined>[];
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
  dispatch: DispatchWithResponse<
    RequestType,
    SuccessType,
    FailureType,
    SuccessResponse
  >;
  request: RequestFunction<undefined, SuccessResponse>;
  onSuccess?: IOnSuccess<SuccessResponse>[];
}): Promise<void>;
// without params, without response
export async function handleRequestAction<
  RequestType,
  SuccessType,
  FailureType
>({
  action,
  dispatch,
  request,
  onSuccess
}: {
  action: IAction<RequestType, SuccessType, FailureType>;
  dispatch: DispatchWitoutResponse<RequestType, SuccessType, FailureType>;
  request: RequestFunction<undefined, undefined>;
  onSuccess?: IOnSuccess<undefined>[];
}): Promise<void>;
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
    } else {
      dispatch({
        type: action.SUCCESS,
        ...(response && { payload: { response } })
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
