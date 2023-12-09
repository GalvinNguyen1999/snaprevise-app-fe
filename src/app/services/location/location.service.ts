import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'
import { LocationDetails } from '../../interfaces/location'

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrlLocation = `${environment.baseUrl}/location`
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${localStorage.getItem('token')}` ?? ''
  })

  constructor(private http: HttpClient) {}

  submitLocationDetail(place: LocationDetails | undefined) {
    return this.http.post(`${this.baseUrlLocation}/submit-location`, { place }, { headers: this.headers })
  }
}
