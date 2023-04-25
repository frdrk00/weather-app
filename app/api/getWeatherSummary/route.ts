import { NextResponse } from "next/server";

import openai from "openai";

export async function POST(request: Request) {
    // weatherdata in the body of the POST req
    const { weatherData } = await request.json()

    // @ts-ignore
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: 'system',
                content: `Pretend you're a weather new presenter presenting LIVE on television. Be energetic and full of charisma. Introduce yourself as Frederik and say are LIVE from the Nitra town. State the city you are providing a summary for. Then give a summary of todays weather only. Make it easy for the viewer to understand and know what to do to prepare for those weather conditions such as wear SPF if the UV is high etc. use the uv_index data provided to provide UV advice. Provide a joke regarding the weather. Assume the data came from your team at the news office and not the user.`,
            },
            {
                role: "user",
                content: `Hi there, can i get a summary of todays weather, use the following information to get weather data: ${JSON.stringify(
                    weatherData,
                )}`
            }
        ]
    })

    const { data } = response

    console.log('DATA IS: ', data);
    
    return NextResponse.json(data.choices[0].message)
}