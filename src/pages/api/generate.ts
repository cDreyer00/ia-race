// create a standard ts next api route
import { NextApiRequest, NextApiResponse } from 'next'
import ImageGenerator from '../../classes/ImageGenerator'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
    // console.log(req)
    const prompt = JSON.parse(req.body).prompt
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