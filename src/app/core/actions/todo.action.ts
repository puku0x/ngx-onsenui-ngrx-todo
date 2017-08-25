import { Action } from '@ngrx/store';
import { Todo } from '../../interfaces';

// アクション名
export const FIND_ALL         = '[Todo] Find All';
export const FIND_ALL_SUCCESS = '[Todo] Find All Success';
export const FIND_ALL_FAILED  = '[Todo] Find All Failed';
export const FIND             = '[Todo] Find';
export const FIND_SUCCESS     = '[Todo] Find Success';
export const FIND_FAILED      = '[Todo] Find Failed';
export const CREATE           = '[Todo] Create';
export const CREATE_SUCCESS   = '[Todo] Create Success';
export const CREATE_FAILED    = '[Todo] Create Failed';
export const UPDATE           = '[Todo] Update';
export const UPDATE_SUCCESS   = '[Todo] Update Success';
export const UPDATE_FAILED    = '[Todo] Update Failed';
export const DELETE           = '[Todo] Delete';
export const DELETE_SUCCESS   = '[Todo] Delete Success';
export const DELETE_FAILED    = '[Todo] Delete Failed';

/**
 * 一覧取得
 */
export class FindAll implements Action {
  readonly type = FIND_ALL;
  constructor() {}
}

/**
 * 一覧取得成功
 */
export class FindAllSuccess implements Action {
  readonly type = FIND_ALL_SUCCESS;
  constructor(public payload: Todo[]) {}
}

/**
 * 一覧取得失敗
 */
export class FindAllFailed implements Action {
  readonly type = FIND_ALL_FAILED;
  constructor() {}
}

/**
 * 一件取得
 */
export class Find implements Action {
  readonly type = FIND;
  constructor(public payload: number) {}
}

/**
 * 一件取得成功
 */
export class FindSuccess implements Action {
  readonly type = FIND_SUCCESS;
  constructor(public payload: Todo) {}
}

/**
 * 一件取得失敗
 */
export class FindFailed implements Action {
  readonly type = FIND_FAILED;
  constructor() {}
}

/**
 * 登録
 */
export class Create implements Action {
  readonly type = CREATE;
  constructor(public payload: Todo) {}
}

/**
 * 登録成功
 */
export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public payload: Todo) {}
}

/**
 * 登録失敗
 */
export class CreateFailed implements Action {
  readonly type = CREATE_FAILED;
  constructor() {}
}

/**
 * 更新
 */
export class Update implements Action {
  readonly type = UPDATE;
  constructor(public payload: Todo) {}
}

/**
 * 更新成功
 */
export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;
  constructor(public payload: Todo) {}
}

/**
 * 更新失敗
 */
export class UpdateFailed implements Action {
  readonly type = UPDATE_FAILED;
  constructor() {}
}

/**
 * 削除
 */
export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: number) {}
}

/**
 * 削除成功
 */
export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;
  constructor(public payload: number) {}
}

/**
 * 削除失敗
 */
export class DeleteFailed implements Action {
  readonly type = DELETE_FAILED;
  constructor() {}
}

/**
 * アクション
 */
export type Actions =
  FindAll | FindAllSuccess | FindAllFailed |
  Find    | FindSuccess    | FindFailed    |
  Create  | CreateSuccess  | CreateFailed  |
  Update  | UpdateSuccess  | UpdateFailed  |
  Delete  | DeleteSuccess  | DeleteFailed;
