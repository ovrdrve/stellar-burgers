import { UnknownAction } from '@reduxjs/toolkit';
import {
  UnknownAsyncThunkFulfilledAction,
  UnknownAsyncThunkPendingAction,
  UnknownAsyncThunkRejectedAction
} from '@reduxjs/toolkit/dist/matchers';

const hasPrefix = (action: UnknownAction, prefix: string): boolean =>
  action.type.startsWith(prefix);

const isPending = (action: UnknownAsyncThunkPendingAction) =>
  action.type.endsWith('pending');

const isFulfilled = (action: UnknownAsyncThunkFulfilledAction) =>
  action.type.endsWith('fulfilled');

const isRejected = (action: UnknownAsyncThunkRejectedAction) =>
  action.type.endsWith('rejected');

export const isActionPending =
  (prefix: string) => (action: UnknownAsyncThunkPendingAction) =>
    hasPrefix(action, prefix) && isPending(action);

export const isActionFulfilled =
  (prefix: string) => (action: UnknownAsyncThunkFulfilledAction) =>
    hasPrefix(action, prefix) && isFulfilled(action);

export const isActionRejected =
  (prefix: string) => (action: UnknownAsyncThunkRejectedAction) =>
    hasPrefix(action, prefix) && isRejected(action);
