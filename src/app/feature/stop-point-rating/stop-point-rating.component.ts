import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BottomMenuManagerService } from '../../core/services/bottom-menu-manager.service';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
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
import { NewReview } from '../../shared/models/NewReview';
import { StarRatingComponent } from '../../shared/star-rating/star-rating.component';

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
    StarRatingComponent,
  ],
  templateUrl: './stop-point-rating.component.html',
  styleUrl: './stop-point-rating.component.scss',
})
export class StopPointRatingComponent implements OnInit {
  private menuButtonService = inject(BottomMenuManagerService);
  private formBuilder = inject(FormBuilder);
  private starRatingComponent = inject(StarRatingComponent)
  public reviewForms = this.formBuilder.group({
    stopPointId: ['', Validators.required],
    score: [0, [Validators.min(0), Validators.max(5)]],
    description: ['', Validators.nullValidator],
  });

  private reviewService = inject(StopPointReviewService);
  private stopPoint = inject(StopPointsService);
  private router: Router = inject(Router);

  public closePoints: any[] = [];
  public idStopPoint: string = ""
  public name: string = ""
  currentRating: number = 0;

  public closeStopPoints$?: Observable<any>;

  @ViewChild('rateStopPoint') menuOptions!: TemplateRef<any>;

  constructor(private route: ActivatedRoute){
  } 

  onRatingChange(newRating: number) {
    this.currentRating = newRating;
    this.reviewForms.get('score')?.setValue(newRating)
    console.log(this.reviewForms.get('score')?.value)
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params['id'])
      this.idStopPoint = params['id']
      if (params['id']) {
        this.stopPoint.getStopPointById(this.idStopPoint).pipe(
          map((sp)=>{
            this.name = sp.name
          }),
          first()
        )
        // Se houver um ID, define o valor do select e desativa o campo
        this.reviewForms.patchValue({ stopPointId: params['id']});
      }
      this.createStopPointListObservable();
    });
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
    const formsData = this.reviewForms.getRawValue() as NewReveiwForm;

    const newReview = {
      stopPointId: formsData.stopPointId,
      description: formsData.description,
      score: formsData.score,
    } as NewReview;

    this.reviewService
      .createReviewToStopPoint(newReview)
      .subscribe((result) => console.log(result));

    this.router.navigate(['/home']);
  }
}

type NewReveiwForm = {
  stopPointId: string | null;
  score: number;
  description: string;
};
