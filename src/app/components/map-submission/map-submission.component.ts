import {
  Component,
  ElementRef,
  ViewChild,
  NgZone
} from '@angular/core'
import { Loader } from '@googlemaps/js-api-loader'
import { environment } from '../../../environments/environment'
import { LocationService } from '../../services/location/location.service'

@Component({
  selector: 'app-map-submission',
  templateUrl: './map-submission.component.html',
  styleUrls: ['./map-submission.component.css']
})

export class MapSubmissionComponent {
  selectedPlaceId: string | undefined
  // configure google maps
  @ViewChild('map') mapRef!: ElementRef
  private map: google.maps.Map | undefined
  private loader = new Loader({
    apiKey: environment.apiKey,
    version: 'weekly'
  })

  constructor(
    private ngZone: NgZone,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.loader
      .importLibrary('places')
      .then(() => {
        this.initMap()
      })
  }

  private initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 2
    }

    this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions)

    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      this.ngZone.run(() => {
        if (event.latLng) {
          this.handleMapClick(event.latLng)
        }
      })
    })
  }

  private handleMapClick(latLng: google.maps.LatLng) {
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode(
      { location: latLng },
      (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && Array.isArray(results)) {
          this.selectedPlaceId = results[0].place_id
        } else {
          console.error('Geocode was not successful for the following reason:', status)
        }
      }
    )
  }

  submitLocation() {
    if (this.selectedPlaceId) {
      this.locationService.submitLocationDetail(this.selectedPlaceId)
    } else {
      console.error('No place selected')
    }
  }
}
