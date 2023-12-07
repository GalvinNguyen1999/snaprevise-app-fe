import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { environment } from '../../../environments/environment'
import { Location } from '../../interfaces/location'

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrlLocation = `${environment.baseUrl}/location`
  private locationSubject = new BehaviorSubject<Location | null>(null)

  location$ = this.locationSubject.asObservable()
  constructor(
    private http: HttpClient
  ) {}

  submitLocationDetail(placeId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`
    })

    const options = {
      headers: headers,
      params: { placeId: placeId }
    }

    return this.http.post(`${this.baseUrlLocation}/submit-location`, null, options)
      .subscribe({
        next: (response) => { },
        error: (error) => { console.error(error) }
      })
  }
}
