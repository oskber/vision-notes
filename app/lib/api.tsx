import vision from '@google-cloud/vision';
import formidable from 'formidable';
import {NextApiRequest, NextApiResponse} from 'next';
import * as fs from 'node:fs';


const client = new vision.ImageAnnotatorClient();

export default async function CloudVisionHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed'});
    }

    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({error: 'Error parsing form data'});
        }

        const file = Array.isArray(files.photo) ? files.photo[0] : files.photo;

        if (!file) {
            return res.status(400).json({error: 'No file uploaded'});
        }
        const filePath = file.filepath;

        try {
            const [result] = await client.textDetection(fs.readFileSync(filePath));
            const detections = result.textAnnotations;
            const extractedText = !(detections) || detections[0]?.description || '';

            return res.status(200).json({extractedText});
        } catch (error) {
            return res.status(500).json({error: 'Error processing image'});
        }
    });
}
