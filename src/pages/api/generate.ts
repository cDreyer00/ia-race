// create a standard ts next api route
import { NextApiRequest, NextApiResponse } from 'next'
import ImageGenerator from '../../classes/ImageGenerator'
import fs from 'fs'
import axios from 'axios'

import dotenv from 'dotenv'
dotenv.config();

const apiBaseUrl = process.env.API_BASE_URL as string;

type data = {
    output?: string,
    error?: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<data>) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

    const prompt = JSON.parse(req.body).prompt
    const imageGenerator = new ImageGenerator({
        token: process.env.REPLICATE_TOKEN as string,
        modelId: process.env.MODEL_ID as string
    })

    try {
        const { outputUrl, id } = await imageGenerator.runModel(prompt)
        const imagesPath = `public/ia-images`
        const imageName = `replicate-${id}.png`
        const imgBinary = await axios.get(outputUrl, { responseType: 'arraybuffer' })
        await fs.promises.writeFile(`${imagesPath}/${imageName}`, imgBinary.data)

        const output = `${apiBaseUrl}/image?id=${id}`;
        res.status(200).json({ output: output })
    } catch (e) {
        res.status(500).json({ error: e })
    }
}