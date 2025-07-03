import { getServerSideURL } from '@/utilities/getURL'
import CardsTableClient from './page.client'
import React from 'react'

export const dynamic = 'force-dynamic'

export default async function CardsPage() {
  const res = await fetch(`${getServerSideURL()}/api/cards`, { cache: 'no-store' })
  const cards = await res.json()

  return (
    <div className="pt-24 pb-24 container">
      <h1 className="mb-6">Cards</h1>
      <CardsTableClient cards={cards} />
    </div>
  )
}
