// Reverse geocoding via OpenStreetMap Nominatim - free, no API key. Usage
// policy: https://operations.osmfoundation.org/policies/nominatim/ (low
// volume, identifies itself via the browser's Referer header).

interface NominatimAddress {
  suburb?: string;
  neighbourhood?: string;
  city_district?: string;
  town?: string;
  village?: string;
  city?: string;
  county?: string;
}

interface NominatimResponse {
  address?: NominatimAddress;
  display_name?: string;
}

/**
 * Resolves GPS coordinates to a short "Area, City" string matching this
 * app's existing listing.location format (e.g. "Westlands, Nairobi").
 * Returns null on any failure - never throws.
 */
export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=14&addressdetails=1`,
    );
    if (!res.ok) return null;

    const data = (await res.json()) as NominatimResponse;
    const addr = data.address ?? {};
    const area = addr.suburb ?? addr.neighbourhood ?? addr.city_district ?? addr.town ?? addr.village;
    const city = addr.city ?? addr.town ?? addr.county;

    if (area && city && area !== city) return `${area}, ${city}`;
    return city ?? area ?? data.display_name ?? null;
  } catch {
    return null;
  }
}
