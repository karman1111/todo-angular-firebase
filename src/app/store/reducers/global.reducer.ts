import { createReducer, on } from "@ngrx/store";
import { GlobalState } from "../../shared/models/global.models";
import * as GlobalActions from '../actions/global.actions'

export const initGlobalState: GlobalState = {
    loading: false
}

export const globalReducer = createReducer(
    initGlobalState,
    on(GlobalActions.setLoading, (state, { loading }) => ({ ...state, loading })),
)