export interface LocationDetails {
  name?: string;
  address?: string;
  country?: string;
  placeType?: string;
  location?: { lat: number; lng: number };
}

export interface LocationDetailItem {
  label: string;
  value: string;
}