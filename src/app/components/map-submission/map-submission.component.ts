import {
  Component,
  ElementRef,
  ViewChild,
  NgZone
} from '@angular/core'
import { Loader } from '@googlemaps/js-api-loader'
import { environment } from '../../../environments/environment'
import { Location } from '../../interfaces/location'
@Component({
  selector: 'app-map-submission',
  templateUrl: './map-submission.component.html',
  styleUrls: ['./map-submission.component.css']
})
export class MapSubmissionComponent {
  // configure google maps
  @ViewChild('map') mapRef!: ElementRef
  private map: google.maps.Map | undefined
  private loader = new Loader({
    apiKey: environment.apiKey,
    version: 'weekly'
  })

  constructor(
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loader
      .importLibrary('maps')
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
    const location: Location = {
      lat: latLng.lat(),
      lng: latLng.lng()
    }
  }
}
