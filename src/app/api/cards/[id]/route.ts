import { getCardsCollection } from '@/utilities/tabooDB'
import { ObjectId } from 'mongodb'
import type { NextRequest } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const collection = await getCardsCollection()
  const card = await collection.findOne({ _id: new ObjectId(params.id) })
  if (!card) return new Response('Not found', { status: 404 })
  return Response.json(card)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json()
  const collection = await getCardsCollection()
  await collection.updateOne({ _id: new ObjectId(params.id) }, { $set: data })
  const updated = await collection.findOne({ _id: new ObjectId(params.id) })
  return Response.json(updated)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const collection = await getCardsCollection()
  await collection.deleteOne({ _id: new ObjectId(params.id) })
  return new Response(null, { status: 204 })
}
