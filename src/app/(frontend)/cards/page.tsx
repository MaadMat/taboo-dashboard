import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React from 'react'

export const revalidate = 600

export default async function CardsPage() {
  const payload = await getPayload({ config: configPromise })

  const cards = await payload.find({
    collection: 'cards',
    depth: 0,
    limit: 50,
  })

  return (
    <div className="pt-24 pb-24 container">
      <h1 className="mb-6">Cards</h1>
      <table className="min-w-full border border-border text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Words</th>
            <th className="p-2 border">Category</th>
          </tr>
        </thead>
        <tbody>
          {cards.docs.map((card) => (
            <tr key={card.id}>
              <td className="p-2 border">{card.id}</td>
              <td className="p-2 border">{card.name}</td>
              <td className="p-2 border">{Array.isArray(card.words) ? card.words.map((w: any) => (typeof w === 'string' ? w : w.word)).join(', ') : ''}</td>
              <td className="p-2 border">{card.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

