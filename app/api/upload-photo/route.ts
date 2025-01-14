import {NextResponse} from 'next/server';
import vision from '@google-cloud/vision';

const client = new vision.ImageAnnotatorClient();

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json({error: 'Method not allowed'}, {status: 405});
    }

    try {
        const formData = await req.formData();
        const file = formData.get('photo') as File;

        if (!file) {
            return NextResponse.json({error: 'No file uploaded or file missing'}, {status: 400});
        }

        const arrayBuffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(arrayBuffer);

        const [result] = await client.textDetection({
            image: {content: fileBuffer.toString('base64')},
        });

        if (!result || !result.textAnnotations || result.textAnnotations.length === 0) {
            return NextResponse.json({error: 'No text annotations found'}, {status: 500});
        }

        const detections = result.textAnnotations;
        const extractedText = detections[0]?.description || '';

        return NextResponse.json({extractedText}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: 'Error processing image'}, {status: 500});
    }
}