import { Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BottomMenuManagerService } from '../../core/services/bottom-menu-manager.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet'; 
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Coordenadas, FormCadastroParadaComponent } from '../form-cadastro-parada/form-cadastro-parada.component';
import { GenerateMapsService } from '../../core/services/generate-maps.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LeafletModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

export class HomeComponent implements OnInit, OnDestroy {
  baseLayers: { [layerName: string]: L.Layer; };
  layersControlOptions: L.ControlOptions;

  private osmMap = inject(GenerateMapsService)
  constructor(private dialog: MatDialog) { 
    this.leafletOptions = this.osmMap.leafletOptions
    this.baseLayers = this.osmMap.baseLayers
    this.layersControlOptions = this.osmMap.layersControlOptions
  }
  private menuButtonService = inject(BottomMenuManagerService);
  
  leafletOptions!: L.MapOptions;

  @ViewChild('homeMenuButtons') menuOptions!: TemplateRef<any>;

  ngOnInit(): void {
    this.osmMap.watchUserLocation();
    // Inscreve-se no evento para abrir o diálogo quando o marcador for clicado
    this.osmMap.markerClicked.subscribe((coords: Coordenadas) => {
      this.openDialog(coords);
    });
  }
  
  ngAfterViewInit(): void {
    this.osmMap.addClickEvent();
    this.menuButtonService.setMenuOption(this.menuOptions);
  }

  ngOnDestroy(): void {
    this.osmMap.clearWatch();
  }

  onMapReady(map: L.Map) {
    this.osmMap.map = map;

  }

  openDialog(coords: Coordenadas): void {
    this.dialog.open(FormCadastroParadaComponent, {
        data: {
          title: 'FormCadastroPontosParada',
          message: 'Você clicou no marcador!',
          isError: false,
          isSuccess: true,
          coodenadas: coords,
          descPoint: 'Descrição',
        }
    });
  }
}