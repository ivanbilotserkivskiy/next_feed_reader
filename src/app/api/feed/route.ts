import { NextResponse, NextRequest } from "next/server";
import RSSParser from 'rss-parser';
const parser = new RSSParser();

const parse = async (url: string) => {
  const feed = await parser.parseURL(url);
  return feed
}

 export async function POST(req: NextRequest) {
  try {
    const data = [];
    const subscriptions = await req.json();
    for (const subscription of subscriptions) {
      const feedData = await parse(subscription);

      data.push({title: feedData.title, lastBuildDate: feedData.lastBuildDate, link:feedData.feedUrl});
    }
    return NextResponse.json({
      "feeds": data,
    });
  }
  catch {
    return NextResponse.json({
      "error": "Something went wrong"
    })
  }
} 
