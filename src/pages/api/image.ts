import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
    
    const { id } = req.query;
    if (!id || typeof id !== 'string') {
        res.status(400).json({ error: 'Invalid ID' });
        return;
    }

    const imagesFolder = '/public/ia-images';
    const imagePath = path.join(process.cwd(), imagesFolder, `replicate-${id}.png`);
    if (!fs.existsSync(imagePath)) {
        res.status(404).json({ error: 'Image not found' });
        return;
    }

    const stat = fs.statSync(imagePath);
    
    
    res.writeHead(200, {
        'content-type': 'image/png',
        'content-length': stat.size,
    })

    const readStream = fs.createReadStream(imagePath);
    readStream.pipe(res);
}
