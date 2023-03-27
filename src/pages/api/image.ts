import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

type Data = {
    url?: string
    error?: any
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {

        const id = req.query.id;
        const imageName = `replicate-${id}.png`;
        const imagesFolder = '/public/ia-images';
        const imagePath = path.join(process.cwd(), imagesFolder, imageName);

        if (!fs.existsSync(imagePath)) {
            return res.status(404).json({ error: 'Image not found' });
        }

        // Read the image file and send it back to the client
        const image = fs.readFileSync(imagePath);
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': image.length,
        });
        res.end(image);

    } catch (error) {
        res.status(500).json({ error: error });
    }
}
