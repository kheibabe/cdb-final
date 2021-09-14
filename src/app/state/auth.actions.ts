import { createAction, props } from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthInfos } from '../shared/auth-infos.model';

export const UPDATE_DATA = '[AuthInfos] Update';

export const updateData = createAction(
  UPDATE_DATA,
  props<{ authInfos: AuthInfos}>()
);
