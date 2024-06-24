import { createAction, props } from "@ngrx/store";

export const setLoading = createAction(
    '[Global] Set Loading',
    props<{ loading: boolean }>()
);