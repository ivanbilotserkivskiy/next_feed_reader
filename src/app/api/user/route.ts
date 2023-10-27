import { NextRequest, NextResponse } from "next/server";

type ResponseData = {
    userId: number,
    id: string,
    title: string,
    body: string
}

export async function GET(req:NextRequest) {
  try {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1').then(res => res.json());
    const returnData = data.map((feed: ResponseData) => ({
      id: feed.id,
      userId: feed.userId,
      title: feed.title,
      link: '',
      body: feed.body, 
      lastBuildDate: `${new Date()}`,
    }))
    return NextResponse.json({
      "feeds": returnData
    })

  }
  catch {
    return NextResponse.json({
      "error": "Something went wrong" 
    })
  }
}