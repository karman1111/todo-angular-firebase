import { Component, OnDestroy } from "@angular/core";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from "@ngrx/store";
import { GlobalState } from "../models/global.models";
import { selectGlobalLoadingState } from "../../store/selectors/global.selects";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-loading",
    standalone: true,
    imports: [
        MatProgressSpinnerModule,
        CommonModule
    ],
    template: 
    `
        <mat-spinner [diameter]="30" *ngIf="loading"></mat-spinner>
    `
})
export class LoadingComponent implements OnDestroy{
    private loadingSubscription !: Subscription;
    loading: boolean = false;

    constructor(
        private store: Store<{global: GlobalState}>
    ) {
        this.loadingSubscription = this.store.select(selectGlobalLoadingState)
            .subscribe((loading) => {this.loading = loading});
    }
    ngOnDestroy(): void {
        this.loadingSubscription.unsubscribe();
    }
}