import { IncomingForm } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';
import vision from '@google-cloud/vision';

const client = new vision.ImageAnnotatorClient();

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function CloudVisionHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Error parsing form data:', err);
            return res.status(500).json({ error: 'Error parsing form data' });
        }

        const file = Array.isArray(files.photo) ? files.photo[0] : files.photo;

        if (!file || !fs.existsSync(file.filepath)) {
            console.error('File not found or not uploaded correctly.');
            return res.status(400).json({ error: 'No file uploaded or file missing' });
        }

        try {

            const fileBuffer = fs.readFileSync(file.filepath);

            const [result] = await client.textDetection({
                image: { content: fileBuffer.toString('base64') },
            });

            if (!result || !result.textAnnotations || result.textAnnotations.length === 0) {
                console.error('No text annotations found in the image.');
                return res.status(500).json({ error: 'No text annotations found' });
            }

            const detections = result.textAnnotations;
            const extractedText = detections[0]?.description || '';
            console.log('Extracted Text:', extractedText);

            return res.status(200).json({ extractedText });
        } catch (error) {
            console.error('Error processing image:', error);
            return res.status(500).json({ error: 'Error processing image' });
        } finally {
            fs.unlink(file.filepath, (unlinkErr) => {
                if (unlinkErr) console.error('Error deleting temp file:', unlinkErr);
            });
        }
    });
}
