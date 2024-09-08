import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BottomMenuManagerService } from '../../core/services/bottom-menu-manager.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AsyncPipe, CommonModule } from '@angular/common';
import { StopPointReviewService } from '../../core/services/stop-point-review.service';
import { StopPointsService } from '../../core/services/stop-points.service';
import { bindCallback, first, map, Observable, switchAll, tap } from 'rxjs';

@Component({
  selector: 'app-stop-point-rating',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    AsyncPipe,
    CommonModule,
  ],
  templateUrl: './stop-point-rating.component.html',
  styleUrl: './stop-point-rating.component.scss',
})
export class StopPointRatingComponent implements OnInit {
  private menuButtonService = inject(BottomMenuManagerService);
  private formBuilder = inject(FormBuilder);
  public reviewFoms = this.formBuilder.group({
    stopPointId: [null, Validators.required],
    score: [0, [Validators.min(0), Validators.max(5)]],
    description: ['', Validators.nullValidator],
  });

  private reviewService = inject(StopPointReviewService);
  private stopPoint = inject(StopPointsService);
  public closePoints: any[] = [];

  public closeStopPoints$?: Observable<any>;

  @ViewChild('rateStopPoint') menuOptions!: TemplateRef<any>;

  ngOnInit(): void {
    this.createStopPointListObservable();
  }

  private createStopPointListObservable() {
    this.closeStopPoints$ = this.createCurrentGeolocationObservable().pipe(
      map((currentPosition) =>
        this.stopPoint.getClosePoints({
          latitude: currentPosition.coords.latitude,
          longitude: currentPosition.coords.longitude,
          radius: 40,
        })
      ),
      switchAll(),
      map((stopPointDto: any) => stopPointDto.stopPoints),
      first()
    );
  }

  private createCurrentGeolocationObservable() {
    const someFunction = (
      success: (geolocation: GeolocationPosition) => void
    ) => {
      navigator.geolocation.getCurrentPosition(success, (err) => {
        throw err;
      });
    };

    const myLocation = bindCallback(someFunction);
    return myLocation();
  }

  ngAfterViewInit(): void {
    this.menuButtonService.setMenuOption(this.menuOptions);
  }

  submit() {
    console.log('enviar');
  }
}
