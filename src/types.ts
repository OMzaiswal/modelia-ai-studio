

export type StyleOption = "Editorial" | "Streetwear" | "Vintage";

export interface GenerationRequest {
    imageDataUrl: string;
    prompt: string;
    style: StyleOption;
}

export interface GenerationResponse {
    id: string;
    imageUrl: string;
    prompt: string;
    style: StyleOption;
    createdAt: string;
}