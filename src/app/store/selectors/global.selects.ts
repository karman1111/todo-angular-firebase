import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GlobalState } from "../../shared/models/global.models";

export const globalState = createFeatureSelector<GlobalState>('global');

export const selectGlobalLoadingState = createSelector(globalState, (globalState) => globalState.loading);
