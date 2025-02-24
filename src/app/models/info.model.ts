export interface SubmitRequest {
    id_number: string;
    first_name: string;
    last_name: string;
    birth_date: string;
    image_url: string;
    image_from_camera: string;
}

export interface VerifyRequest {
    id_number: string;
    first_name: string;
    last_name: string;
    birth_date: string;
    image_url: string;
}
