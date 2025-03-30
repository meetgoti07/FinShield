import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { message } = body;

    if (!message) {
        return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    try {
        const prompt = `${message} Respond to the following query in a concise format. Ensure the response is plain text, without unnecessary whitespace, bold text, or special formatting. Limit the answer to at most 100 words.`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        console.log(text);
        return NextResponse.json({ answer: text });
    } catch (error) {
        console.error('Error generating response:', error);
        return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
    }
}