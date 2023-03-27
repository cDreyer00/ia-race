// create a standard ts next api route
import { NextApiRequest, NextApiResponse } from 'next'
import ImageGenerator from '../../classes/ImageGenerator'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

    const prompt = "Rick from RIck And Morty with a gu shooting against aliens on an alien planet, higly detailed and with a lot of detail, Unreal, ArtStation"

    const imageGenerator = new ImageGenerator({
        token: process.env.REPLICATE_TOKEN as string,
        modelId: process.env.MODEL_ID as string
    })
    try {
        const response = await imageGenerator.runModel(prompt)
        const { id } = response.data
        const prediction = await imageGenerator.predictionOutput(id)
        res.status(200).json({ prediction })
    } catch (e) {
        res.status(500).json({ error: e })
    }
}