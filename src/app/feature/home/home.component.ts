import { Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BottomMenuManagerService } from '../../core/services/bottom-menu-manager.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RouterLink } from '@angular/router';
import * as L from 'leaflet';

const layOsm: L.TileLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  minZoom: 19,
  attribution: 'Map-Name',
  detectRetina: true
});

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, LeafletModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  latitude: number = 0;
  longitude: number = 0;
  watchId: number = 0;
  map: L.Map | undefined;
  marker: L.Marker | undefined;
  circle: L.Circle | undefined;

  leafletOptions: L.MapOptions = {
    zoom: 15,
    zoomControl: false,
    dragging: false,        // Desabilita arrastar o mapa
    scrollWheelZoom: false, // Desabilita zoom com a roda do mouse
    doubleClickZoom: false, // Desabilita zoom com duplo clique
    boxZoom: false,         // Desabilita zoom com box (clicar e arrastar)
    keyboard: false,        // Desabilita controle via teclado
    touchZoom: false,       // Desabilita zoom por toque (em dispositivos móveis)
    inertia: false          // Desabilita o efeito de inércia ao arrastar o mapa
  };

  baseLayers: { [layerName: string]: L.Layer } = {
    'openstreetmap': layOsm
  };
  layersControlOptions: L.ControlOptions = { position: 'topright' };

  constructor() { }

  private menuButtonService = inject(BottomMenuManagerService);

  @ViewChild('homeMenuButtons') menuOptions!: TemplateRef<any>;

  ngOnInit(): void {
    this.watchUserLocation();
  }

  ngAfterViewInit(): void {
    this.menuButtonService.setMenuOption(this.menuOptions);
  }

  ngOnDestroy(): void {
    this.clearWatch();
  }

  onMapReady(map: L.Map) {
    this.map = map;
    console.log(map);
  }

  watchUserLocation(): void {
    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          const latLng = new L.LatLng(this.latitude, this.longitude);

          // Centraliza o mapa na nova coordenada
          this.map?.panTo(latLng);

          // Remove o marcador e círculo anterior, se existirem
          if (this.marker) {
            this.map?.removeLayer(this.marker);
          }
          if (this.circle) {
            this.map?.removeLayer(this.circle);
          }

          // Adiciona o marcador personalizado
          this.marker = new L.Marker(latLng, {
            icon: new L.Icon({
              iconSize: [50, 41],
              iconAnchor: [13, 41],
              iconUrl: 'assets/blue-marker.svg',
            }),
            title: 'Você está aqui'
          }).addTo(this.map!);

          // Desenha um círculo azul ao redor do marcador
          this.circle = L.circle(latLng, {
            radius: 30, // 30m de raio
            color: 'blue',
            fillColor: '#30f',
            fillOpacity: 0.2
          }).addTo(this.map!);

          console.log(latLng);
        },
        (error) => {
          console.error('Erro ao obter localização: ', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 50,
          maximumAge: 5
        }
      );
    } else {
      console.error('Geolocalização não é suportada por este navegador.');
    }
  }

  clearWatch(): void {
    if (this.watchId !== undefined) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }
}