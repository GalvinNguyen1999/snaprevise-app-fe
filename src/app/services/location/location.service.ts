import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Loader } from '@googlemaps/js-api-loader'
import { Injectable } from '@angular/core'
import { BehaviorSubject, tap } from 'rxjs'
import { Router } from '@angular/router'
import { environment } from '../../../environments/environment'
import { Location } from '../../interfaces/location'

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl = `${environment.baseUrl}/location`
  private locationSubject = new BehaviorSubject<Location | null>(null)

  private loader = new Loader({
    apiKey: environment.apiKey,
    version: 'weekly'
  })

  location$ = this.locationSubject.asObservable()
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  submitLocation(location: Location) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`
    })

    const params = { location: `${location.lat},${location.lng}` }

    return this.http.post(`${this.baseUrl}/submit-location`, null, { headers, params })
      .pipe(
        tap((response: any) => {
          if (response) {
            this.locationSubject.next(response)
          }
        })
      )
  }
}
