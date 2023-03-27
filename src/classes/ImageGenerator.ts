import axios, { AxiosResponse } from 'axios'


export default class ImageGenerator implements IImageGenerator {

    predictions: IPrediction[];
    modelId: string;
    apiUrl: string;
    token: string;

    constructor({ token, modelId }: IModelAccess) {
        this.token = token;
        this.modelId = modelId;
        this.modelId = modelId;
        this.predictions = [];

        this.apiUrl = 'https://api.replicate.com/v1/predictions'
    }

    async check(): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            const headers = {
                'Authorization': `Token ${this.token}`,
                'Content-Type': 'application/json'
            }
            const res = await axios.get(this.apiUrl, { headers })
            if (res.status === 200) {
                resolve(true)
            } else {
                reject(false)
            }
        })
    }

    runModel(prompt: string): Promise<IPrediction> {
        return new Promise(async (resolve, reject) => {
            const data = {
                'version': this.modelId,
                'input': {
                    'prompt': prompt
                }
            }

            const headers = {
                'Authorization': `Token ${this.token}`,
                'Content-Type': 'application/json'
            }

            try {
                const res = await axios.post(this.apiUrl, data, { headers })
                let { created_at, id, version } = res.data;

                const imageData: IPrediction = {
                    started_at: Date.now().toString(),
                    completed_at: '',
                    id: id,
                    prompt: prompt,
                    outputUrl: '',
                    version: version
                }

                const prediction = await this.predictionOutput(imageData.id);
                imageData.outputUrl = prediction;
                imageData.completed_at = Date.now().toString();
                this.predictions.push(imageData);
                resolve(imageData)
            } catch (e) {
                reject(e);
            }
        })
    }

    async predictionOutput(predictionId: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const headers = {
                'Authorization': `Token ${this.token}`,
                'Content-Type': 'application/json'
            }

            try {
                let res = await axios.get(`${this.apiUrl}/${predictionId}`, { headers })
                while (!res.data.output) {
                    res = await axios.get(`${this.apiUrl}/${predictionId}`, { headers })
                }
                const prediction = res.data.output[0];
                resolve(prediction);
            } catch (e) {
                reject(e)
            }
        })
    }
}

interface IPrediction {
    started_at: string,
    completed_at: string,
    id: string,
    prompt: string,
    outputUrl: string,
    version: string,
}

interface IImageGenerator {
    predictions: IPrediction[],
    token: string,
    modelId: string,
    apiUrl: string,
    check(): Promise<boolean>,
    runModel(prompt: string): Promise<IPrediction>,
    predictionOutput(predictionId: string): Promise<string>,
}

interface IModelAccess {
    token: string,
    modelId: string
}

