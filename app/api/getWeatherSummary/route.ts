import { NextResponse } from "next/server";

import openai from "lib/openai"

export async function POST(request: Request) {
    // weatherdata in the body of the POST req
    const { weatherData } = await request.json()

    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: "Hello world",
    })

console.log(response.data.choices[0].text);
}