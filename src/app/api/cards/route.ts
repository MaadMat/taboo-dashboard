import { getCardsCollection } from '@/utilities/tabooDB'
import type { NextRequest } from 'next/server'

export async function GET() {
  const collection = await getCardsCollection()
  const cards = await collection.find({}).toArray()
  return Response.json(cards)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const collection = await getCardsCollection()
  const result = await collection.insertOne(data)
  const inserted = await collection.findOne({ _id: result.insertedId })
  return Response.json(inserted, { status: 201 })
}
