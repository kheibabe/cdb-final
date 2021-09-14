import { User } from "../model/user.model";
import { AuthInfos } from "../shared/auth-infos.model";
import * as storage from "./storage";
import { Action, createReducer, on } from '@ngrx/store';
import { updateData } from "./auth.actions";

export interface State {
    authInfos: AuthInfos;
}

export const initialState: State = {
    authInfos: storage.getItem('authInfos').authInfos
  };


const authReducer = createReducer(
  initialState,
  on(updateData, (state) => ({authInfos : state.authInfos})),
);

export function getAuthReducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}