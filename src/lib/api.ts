import type { GenerateRequest, GenerateResponse } from "../types";

const sleep = (ms: number) => new Promise((resolve) => {
    setTimeout(resolve, ms);
})

export class AbortError extends Error {
    constructor() {
        super('Request Aborted');
        this.name = 'AbortError';
    }
}

export async function GenerateImage(
    req: GenerateRequest,
    signal?: AbortSignal
): Promise<GenerateResponse> {

    await sleep(1000 + Math.random() * 1000);

    if(signal?.aborted) {
        throw new AbortError();
    }

    if(Math.random() < 0.2) {
        throw new Error('Model Overloaded');
    }

    return {
        id: Date.now().toString(),
        imageUrl: `https://picsum.photos/400/400?random=${Math.floor(
      Math.random() * 1000
    )}`,
        prompt: req.prompt,
        style: req.style,
        createdAt: new Date().toISOString()
    }
}