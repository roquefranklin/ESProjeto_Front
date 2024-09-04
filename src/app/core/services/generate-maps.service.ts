import { EventEmitter, Injectable } from '@angular/core';
import * as L from 'leaflet';


export interface Coordenadas{
  latitude: number,
  longitude: number,
  accuracity: number
}

const layOsm: L.TileLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  minZoom: 9,
  attribution: 'Map-Name',
  detectRetina: true
});

@Injectable({
  providedIn: 'root'
})

export class GenerateMapsService {

  public latitude: number = 0;
  public longitude: number = 0;
  public accuracy: number = 0;
  public watchId: number = 0;
  public map: L.Map | undefined;
  public marker: L.Marker | undefined;
  public circle: L.Circle | undefined;


  public leafletOptions: L.MapOptions = {
    zoom: 5,
    zoomControl: true,
    dragging: true,        // Desabilita arrastar o mapa
    scrollWheelZoom: false, // Desabilita zoom com a roda do mouse
    doubleClickZoom: false, // Desabilita zoom com duplo clique
    boxZoom: false,         // Desabilita zoom com box (clicar e arrastar)
    keyboard: false,        // Desabilita controle via teclado
    touchZoom: true,       // Desabilita zoom por toque (em dispositivos móveis)
    inertia: false          // Desabilita o efeito de inércia ao arrastar o mapa
  };

  public baseLayers: { [layerName: string]: L.Layer } = {
    'openstreetmap': layOsm
  };
  
  public layersControlOptions: L.ControlOptions = { position: 'topright' };
  public markerClicked: EventEmitter<{ latitude: number, longitude: number }> = new EventEmitter();

  constructor() { }
  
  public watchUserLocation(retries: number = 3, delay: number = 1000): void {
    if (navigator.geolocation) {

      this.watchId = navigator.geolocation.watchPosition(
        
        (position) => {
          console.log(position)
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.accuracy = position.coords.accuracy;
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
              iconSize: [50, 81],
              iconAnchor: [23, 51],
              iconUrl: '/assets/blue-marker.svg',
            }),
            title: 'Você está aqui'
          }).addTo(this.map!);

          this.marker.on('click', () => {
            this.markerClicked.emit({ latitude: this.latitude, longitude: this.longitude });
          });
          
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
          if (retries > 0) {
            console.log(`Tentando novamente... (${retries} tentativas restantes)`);
            setTimeout(() => {
              this.watchUserLocation(retries - 1, delay);
            }, delay);
          } else {
            console.error('Máximo de tentativas atingido. Não foi possível obter a localização.');
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 500,
          maximumAge: 5
        }
      );
    } else {
      console.error('Geolocalização não é suportada por este navegador.');
    }
  }

  public clearWatch(): void {
    if (this.watchId !== undefined) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }

}
