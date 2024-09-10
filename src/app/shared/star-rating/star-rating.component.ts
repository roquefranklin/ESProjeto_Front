import { Component, 
  OnInit, 
  Input, 
  Output, 
  EventEmitter, 
  ViewEncapsulation,
  Injectable} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatError } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon';
import { MatTooltip} from '@angular/material/tooltip'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button'; // Importar o MatButtonModule

@Component({
  selector: 'mat-star-rating',
  templateUrl: './star-rating.component.html',
  standalone: true,
  imports: [
    MatIcon,
    MatError,
    MatTooltip,
    MatButtonModule,
    CommonModule
  ],
  styleUrls: ['./star-rating.component.scss']
})

@Injectable({
  providedIn: 'root',
})

export class StarRatingComponent implements OnInit {


  @Input() rating: number = 3;
  @Input() starCount: number = 5;
  @Input() color: 'primary' | 'secondary' | 'warn' | 'accent' = "secondary"; // Especificar os valores permitidos
  // @Output() private ratingUpdated = new EventEmitter<number>();
  @Output() ratingUpdated = new EventEmitter<number>();

  private snackBarDuration: number = 2000;
  public ratingArr: number[] = [];

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.ratingArr = Array(this.starCount).fill(0).map((_, i) => i); // Inicializar o array de estrelas
  }
  onClick(rating:number) {
    this.rating = rating    
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number) {
    return 'motorcycle'; // Mostrar estrela cheia ou vazia
  }
  showColor(index: number) {
    return this.rating > index ? 'warn' : 'secondary'; // Mostrar estrela cheia ou vazia
  }
}
export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  secondary = "secondary",
  warn = "warn"
}
