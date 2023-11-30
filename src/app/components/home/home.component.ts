import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service'
import { LocationService } from '../../services/location/location.service'
import { Loader } from '@googlemaps/js-api-loader'
import { environment } from '../../../environments/environment'
import { MessageService } from 'primeng/api';
import { Location } from '../../interfaces/location'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user: any;

  @ViewChild('map') mapRef!: ElementRef;
  private map: google.maps.Map | undefined;
  private loader = new Loader({
    apiKey: environment.apiKey,
    version: 'weekly'
  });

  private selectedLocation: { lat: number; lng: number } | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone,
    private locationService: LocationService,
    private messageService: MessageService
  ) {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.loader.load().then(() => {
      this.initMap();
    });
  }

  private initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 2
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);

    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      this.ngZone.run(() => {
        if (event.latLng) {
          this.handleMapClick(event.latLng);
        }
      });
    });
  }

  private handleMapClick(latLng: google.maps.LatLng): void {
    this.selectedLocation = {
      lat: latLng.lat(),
      lng: latLng.lng()
    };
  }

  public submitLocation() {
    if (!this.selectedLocation) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select a location' });
      return;
    }
  
    const locationData = {
      lat: this.selectedLocation.lat,
      lng: this.selectedLocation.lng
    };

    this.locationService.submitLocation(locationData).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Location submitted successfully' });
        this.selectedLocation = null;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      }
    });
  }
  
  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
