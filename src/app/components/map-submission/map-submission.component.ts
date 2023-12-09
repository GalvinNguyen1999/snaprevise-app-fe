import {
  Component,
  ElementRef,
  ViewChild,
  NgZone,
  ChangeDetectorRef
} from '@angular/core'
import { Loader } from '@googlemaps/js-api-loader'
import { environment } from '../../../environments/environment'
import { LocationService } from '../../services/location/location.service'
import { MessageService } from 'primeng/api'
import { LocationDetails, LocationDetailItem } from '../../interfaces/location'

@Component({
  selector: 'app-map-submission',
  templateUrl: './map-submission.component.html',
  styleUrls: ['./map-submission.component.css']
})
export class MapSubmissionComponent {
  mapInstance: google.maps.Map | undefined
  locationDetails: LocationDetails | undefined
  locationDetailsList: LocationDetailItem[] | undefined

  @ViewChild('map') mapRef!: ElementRef
  private loader = new Loader({
    apiKey: environment.apiKey,
    version: 'weekly'
  })

  constructor(
    private ngZone: NgZone,
    private locationService: LocationService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {
    // Initialize the map
    this.loader.importLibrary('places').then(() => this.initMap())
    this.locationDetailsList = this.getLocationDetailsList()
  }

  // Use a getter to dynamically generate locationDetailsLis
  getLocationDetailsList(): LocationDetailItem[] {
    return [
      { label: 'Name', value: this.locationDetails?.name || '' },
      { label: 'Address', value: this.locationDetails?.address || '' },
      { label: 'Type', value: this.locationDetails?.placeType || '' },
      { label: 'Country', value: this.locationDetails?.country || '' }
    ]
  }

  // Use a setter to update both locationDetails and locationDetailsList
  set locationDetailsSetter(value: LocationDetails | undefined) {
    this.locationDetails = value
    this.locationDetailsList = this.getLocationDetailsList()
    this.cdr.detectChanges()
  }

  private initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 2
    }

    this.mapInstance = new google.maps.Map(this.mapRef.nativeElement, mapOptions)

    this.mapInstance.addListener('click', (event: google.maps.MapMouseEvent) => {
      this.ngZone.run(() => {
        if (event.latLng) {
          this.getDetailsAfterMapClick(event.latLng)
        }
      })
    })
  }

  private getDetailsAfterMapClick(latLng: google.maps.LatLng) {
    const geocoder = new google.maps.Geocoder()

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && Array.isArray(results)) {
        this.getAndSetPlaceDetails(results[0].place_id)
      } else {
        throw new Error('Geocode was not successful for the following reason: ' + status)
      }
    })
  }

  private getAndSetPlaceDetails(placeId: string) {
    const service = new google.maps.places.PlacesService(this.mapInstance as google.maps.Map)

    service.getDetails({ placeId: placeId }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.setLocationDetails(place)
        this.locationDetailsSetter = this.locationDetails
      }
    })
  }

  setLocationDetails = (place: any) => {
    this.locationDetails = {
      name: place?.name,
      address: place?.formatted_address,
      placeType: place?.types?.[0],
      country: this.getCountryFromAddress(place?.formatted_address || ''),
      location: {
        lat: place?.geometry?.location?.lat() || 0,
        lng: place?.geometry?.location?.lng() || 0
      }
    }
  }

  private getCountryFromAddress(address: string): string {
    const addressArray = address.split(',')
    const country = addressArray[addressArray.length - 1].trim()
    return country
  }

  submitLocation(): void {
    if (this.locationDetails) {
      this.locationService.submitLocationDetail(this.locationDetails).subscribe({
        next: () => this.displaySuccessMessage()
      })
    } else {
      this.displayErrorMessage()
    }
  }

  private displaySuccessMessage(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Location submitted'
    })
  }

  private displayErrorMessage(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Please select a location'
    })
  }
}
