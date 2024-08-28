import { Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BottomMenuManagerService } from '../../core/services/bottom-menu-manager.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RouterLink } from '@angular/router';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, LeafletModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

export class HomeComponent implements OnInit, OnDestroy{
  
  latitude: number = 0;
  longitude: number = 0;
  watchId: number = 0;

  map: Leaflet.Map | undefined;
  
  constructor() {
  }
  private menuButtonService = inject(BottomMenuManagerService);
  
  
  @ViewChild('homeMenuButtons') menuOptions!: TemplateRef<any>;
  
  options: Leaflet.MapOptions = {
    layers: getLayers(),
    zoom: 10,
    center: new Leaflet.LatLng(this.latitude, this.longitude)
  };
  ngOnInit(): void {
    this.watchUserLocation();
  }
  ngAfterViewInit(): void {
    this.menuButtonService.setMenuOption(this.menuOptions);
  }
  
  ngOnDestroy(): void {
    this.clearWatch()
  }
  
  watchUserLocation(): void {
    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          this.latitude = position.coords.latitude
          this.longitude = position.coords.longitude
          this.map?.panTo(new Leaflet.LatLng(this.latitude, this.longitude))
        },
        (error) => {
          console.error('Erro ao obter localização: ', error);
        },
        {
          enableHighAccuracy: true, // Tenta obter a localização mais precisa possível
          timeout: 5000,            // Tempo máximo para obter a localização (em milissegundos)
          maximumAge: 0             // Não usa cache; sempre tenta obter uma nova posição
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

export const getMarkers = (): Leaflet.Marker[] => {
  return [
    new Leaflet.Marker(new Leaflet.LatLng(43.5121264, 16.4700729), {
      icon: new Leaflet.Icon({
        iconSize: [50, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/blue-marker.svg',
      }),
      title: 'Workspace'
    } as Leaflet.MarkerOptions),
    new Leaflet.Marker(new Leaflet.LatLng(43.5074826, 16.4390046), {
      icon: new Leaflet.Icon({
        iconSize: [50, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/red-marker.svg',
      }),
      title: 'Riva'
    } as Leaflet.MarkerOptions),
  ] as Leaflet.Marker[];
};

export const getRoutes = (): Leaflet.Polyline[] => {
  return [
    new Leaflet.Polyline([
      new Leaflet.LatLng(43.5121264, 16.4700729),
      new Leaflet.LatLng(43.5074826, 16.4390046),
    ] as Leaflet.LatLng[], {
      color: '#0d9148'
    } as Leaflet.PolylineOptions)
  ] as Leaflet.Polyline[];
};

export const getLayers = (): Leaflet.Layer[] => {
  return [
    // Basic style
    new Leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    } as Leaflet.TileLayerOptions),
    // Pastel style, remove if you want basic style. Uncomment if you want pastel style.
    new Leaflet.TileLayer('https://api.maptiler.com/maps/pastel/{z}/{x}/{y}.png?key={your_key}', {
      attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
    } as Leaflet.TileLayerOptions),
    // new Leaflet.TileLayer('https://api.maptiler.com/maps/pastel/{z}/{x}/{y}.png?key={your_key}', {
    //   attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
    // } as Leaflet.TileLayerOptions),
    ...getMarkers(),
    ...getRoutes(),
    ...getPolygons()
  ] as Leaflet.Layer[];
};

export const getPolygons = (): Leaflet.Polygon[] => {
  return [
    new Leaflet.Polygon([
      new Leaflet.LatLng(43.5181349, 16.4537963),
      new Leaflet.LatLng(43.517890, 16.439939),
      new Leaflet.LatLng(43.515599, 16.446556),
      new Leaflet.LatLng(43.518025, 16.463492)
    ] as Leaflet.LatLng[],
      {
        fillColor: '#eb530d',
        color: '#eb780d'
      } as Leaflet.PolylineOptions)
  ] as Leaflet.Polygon[];
};
