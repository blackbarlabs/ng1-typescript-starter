import {Action} from 'flux-standard-action';

export const voidAction = (type: string): Action<void> => <Action<void>>{ type: type };

export const payloadAction = <T>(type: string, payload: T): Action<T> => {
  return <Action<T>>{ type, payload };
};
