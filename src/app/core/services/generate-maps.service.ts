import { EventEmitter, inject, Injectable } from '@angular/core';
import { StopPoint, StopPointFeatured, StopPointsService } from '../../core/services/stop-points.service'

import * as L from 'leaflet';

export interface Coordenadas{
  latitude: number,
  longitude: number,
  accuracity: number
}

const layOsm: L.TileLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  minZoom: 17,
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
  public newMarker: L.Marker | undefined;
  public stopPointMarkers: L.Marker[] = [];
  public stopPointCircleMarkers: L.Circle[] = [];
  public circle: L.Circle | undefined;
  public newCircle: L.Circle | undefined;


  public leafletOptions: L.MapOptions = {
    zoom: 16,
    zoomControl: true,
    dragging: true,        // Desabilita arrastar o mapa
    scrollWheelZoom: false, // Desabilita zoom com a roda do mouse
    doubleClickZoom: false, // Desabilita zoom com duplo clique
    boxZoom: false,         // Desabilita zoom com box (clicar e arrastar)
    keyboard: false,        // Desabilita controle via teclado
    touchZoom: true,       // Desabilita zoom por toque (em dispositivos móveis)
    inertia: true          // Desabilita o efeito de inércia ao arrastar o mapa
  };

  public baseLayers: { [layerName: string]: L.Layer } = {
    'openstreetmap': layOsm
  };

  private stopPointService = inject(StopPointsService)

  public layersControlOptions: L.ControlOptions = { position: 'topright' };
  public markerClicked: EventEmitter<{ latitude: number, longitude: number, stopPoint?: StopPoint }> = new EventEmitter();

  constructor() { }
  
  public watchUserLocation(retries: number = 3, delay: number = 1000): void {
    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.accuracy = position.coords.accuracy;
  
          // Centraliza o mapa usando a nova função
          this.centerOnCurrentLocation();
  
          // Remove o marcador e círculo anterior, se existirem
          if (this.marker) {
            this.map?.removeLayer(this.marker);
          }

          // Adiciona os marcadores dos outros stopPoints já salvos
          this.putFeaturedStopPoints()

          // Adiciona o marcador personalizado
          this.marker = new L.Marker(new L.LatLng(this.latitude, this.longitude), {
            icon: new L.Icon({
              iconSize: [50, 81],
              iconAnchor: [23, 51],
              iconUrl: '/assets/capacete.svg',
            }),
            title: 'Você está aqui',
          }).addTo(this.map!);
            
          this.marker.on('click', () => {
            this.markerClicked.emit({ latitude: this.latitude, longitude: this.longitude });
          });
  
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
          maximumAge: 5,
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

  // Novo método para capturar coordenadas ao clicar no mapa
  public addClickEvent(): void {
    let isStopPoint: any = '';
    this.map?.on('click', (e: L.LeafletMouseEvent) => {

      let latlng: any = '';
      let svgFocus: any = ''
      this.stopPointCircleMarkers.forEach((elem)=>{
        if(this.isPointInCircle(e.latlng, elem)){
          isStopPoint = elem; 
        }
      })
      if(isStopPoint == ""){

        // Remove o marcador e círculo anterior, se existirem
        if (this.newMarker) {
          this.map?.removeLayer(this.newMarker);
        }
        if (this.newCircle) {
          this.map?.removeLayer(this.newCircle);
        }
        latlng = e.latlng
        svgFocus = '/assets/red-marker.svg'
      } else {
        latlng = isStopPoint.getLatLng()        
      }
      const lat = parseFloat(latlng.lat.toFixed(7));
      const lng = parseFloat(latlng.lng.toFixed(7));
      const maxZoomLevel = 19;

      // Centraliza o mapa nas coordenadas clicadas e aplica o zoom máximo
      this.map?.setView([lat, lng], maxZoomLevel);
      
      // Adiciona o marcador personalizado
      if(isStopPoint == ""){

        this.newMarker = new L.Marker(e.latlng, {
          icon: new L.Icon({
            iconSize: [50, 81],
            iconAnchor: [23, 51],
            iconUrl: svgFocus,
          }),
          title: 'Ponto de parada',
        }).addTo(this.map!);
        this.newMarker.on('click', () => {
          this.markerClicked.emit({ latitude: lat, longitude: lng });
        });
        
        // Desenha um círculo vermelho ao redor do marcador
        this.newCircle = L.circle(e.latlng, {
          radius: 50, // raio em metros
          color: 'red',
          fillColor: '#B9371C',
          fillOpacity: 0.2,
        }).addTo(this.map!);
      } else {
        this.circle?.on('click', ()=>{
          this.markerClicked.emit({ latitude: lat, longitude: lng, stopPoint: isStopPoint })
        })
      }
      
      // Após 5 segundos, centraliza o mapa novamente na localização atual
      setTimeout(() => {
        this.centerOnCurrentLocation(); // Reutilizando a função
      }, 5000); // 5 segundos
    });
  }

  public centerOnCurrentLocation(): void {
    const currentLocation = new L.LatLng(this.latitude, this.longitude);
    if (this.map) {
      this.map.panTo(currentLocation);
      // this.map.setZoom(this.leafletOptions.zoom!); // Retorna ao zoom original
    }
  }

  // Método para remover marcadores antigos
  public clearStopPointMarkers(): void {
    this.stopPointMarkers.forEach(marker => this.map?.removeLayer(marker));
    this.stopPointMarkers = [];
  }

  public putFeaturedStopPoints(): void {
    this.stopPointService.getClosePoints({ latitude: this.latitude, longitude: this.longitude, radius: 100 })
      .subscribe(
        (data: StopPointFeatured) => {
          if (this.map && data.stopPoints && data.stopPoints.length > 0) {
            // Limpa os marcadores antigos antes de adicionar novos
            this.clearStopPointMarkers();
            
            // Adiciona os novos marcadores
            data.stopPoints.forEach((stopPoint: StopPoint) => {

              const e = new L.LatLng(
                parseFloat(stopPoint.latitude.toFixed(7)), 
                parseFloat(stopPoint.longitude.toFixed(7))
              )
              const stopPointMarker = new L.Marker(e, {
                icon: new L.Icon({
                  iconSize: [50, 81],
                  iconAnchor: [23, 51],
                  iconUrl: '/assets/shop.svg',
                }),
                title: stopPoint.name ?? '',
              }).addTo(this.map!);
  
              stopPointMarker.on('click', () => {
                this.markerClicked.emit({ latitude: stopPoint.latitude, longitude: stopPoint.longitude, stopPoint: stopPoint });
              });

              this.stopPointMarkers.push(stopPointMarker); // Adiciona o marcador ao array
              // Desenha um círculo azul ao redor do marcador
              const newCircleStop = L.circle(e, {
                radius: 50,
                color: 'green',
                fillColor: '#B9FF1C',
                fillOpacity: 0.2,
              }).addTo(this.map!);
              
              this.stopPointCircleMarkers.push(newCircleStop)
    
            });
          } else {
            console.warn('Nenhum ponto de parada foi encontrado ou o mapa não foi inicializado.');
          }
        },
        (error) => {
          console.error('Erro ao obter coordenadas:', error);
        }
      );
  }

  // Função para verificar se um ponto está dentro de um círculo
  public isPointInCircle(point: L.LatLng, circle: L.Circle): boolean {
    const center = circle.getLatLng();
    const radius = circle.getRadius(); // em metros
    const distance = center.distanceTo(point); // distância do ponto ao centro em metros

    return distance <= radius; // true se a distância for menor ou igual ao raio
  }
}
