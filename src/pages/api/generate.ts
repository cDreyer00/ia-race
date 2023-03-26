// create a standard ts next api route

import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ name: "Cristian" })
}

// Path: src\pages\api\hello.ts
// Compare this snippet from src\pages\api\hello.ts:
// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'
//
