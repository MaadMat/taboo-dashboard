import { MongoClient, Collection } from 'mongodb'

let clientPromise: Promise<MongoClient> | null = null

export async function getCardsCollection(): Promise<Collection> {
  if (!clientPromise) {
    const uri = process.env.TABOO_DATABASE_URI || ''
    clientPromise = MongoClient.connect(uri)
  }
  const client = await clientPromise
  return client.db('Taboo').collection('Cards')
}
