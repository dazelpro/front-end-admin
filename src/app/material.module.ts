import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import {
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule, 
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatGridListModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatSlideToggleModule
} from '@angular/material';

const ExportedMatModules = [			
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatGridListModule,
    OverlayModule,
    MatSnackBarModule,
    PortalModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatProgressBarModule
]

@NgModule({
    imports: [...ExportedMatModules	],
    exports: [...ExportedMatModules ]
})
export class MaterialModule { }