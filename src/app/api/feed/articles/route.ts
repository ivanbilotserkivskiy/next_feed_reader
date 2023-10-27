import { NextResponse, NextRequest } from "next/server";
import RSSParser from 'rss-parser';
const parser = new RSSParser();

const parse = async (url: string) => {
  const feed = await parser.parseURL(url);

  return feed
}

export async function GET(req:NextRequest) {
  try {
    const subscriptions = await req.url;

    console.log(subscriptions)


  }
  catch {
    
  }
}

 export async function POST(req: NextRequest) {
  try {
    const subscriptions = await req.json();
    const feedData = await parse(subscriptions);

    return NextResponse.json({"feeds": feedData.items});
  }
  catch {
    return NextResponse.json({
      "error": "Something went wrong"
    })
  }
} 
