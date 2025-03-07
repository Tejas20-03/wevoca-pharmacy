
// GetGoogleMapsLocationByLatLng
export type GetGoogleMapsLocationByLatLng_ResponseType = {
    error_message: string;
    results: [],
    status: string;
} | {
    status: string;
    results: any[];
    plus_code: {
        compound_code: string;
        global_code: string;
    },
}
