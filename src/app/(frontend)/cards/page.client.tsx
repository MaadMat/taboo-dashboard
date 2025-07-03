'use client'
import React, { useState } from 'react'

type Card = {
  _id?: string
  id: string
  name: string
  Words: string[]
  category: string
}

export default function CardsTableClient({ cards: initialCards }: { cards: Card[] }) {
  const [cards, setCards] = useState<Card[]>(initialCards)
  const [form, setForm] = useState<Card>({ id: '', name: '', Words: [], category: '' })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Card | null>(null)

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const createCard = async () => {
    const res = await fetch('/api/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: form.id,
        name: form.name,
        Words: Array.isArray(form.Words) ? form.Words : String(form.Words).split(',').map(w => w.trim()).filter(Boolean),
        category: form.category,
      }),
    })
    if (res.ok) {
      const newCard = await res.json()
      setCards([...cards, newCard])
      setForm({ id: '', name: '', Words: [], category: '' })
    }
  }

  const startEdit = (card: Card) => {
    setEditingId(card._id || null)
    setEditForm({ ...card })
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editForm) return
    const { name, value } = e.target
    setEditForm({ ...editForm, [name]: value })
  }

  const saveEdit = async (id: string) => {
    if (!editForm) return
    const res = await fetch(`/api/cards/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editForm.id,
        name: editForm.name,
        Words: Array.isArray(editForm.Words) ? editForm.Words : String(editForm.Words).split(',').map(w => w.trim()).filter(Boolean),
        category: editForm.category,
      }),
    })
    if (res.ok) {
      const updated = await res.json()
      setCards(cards.map(c => (c._id === id ? updated : c)))
      setEditingId(null)
      setEditForm(null)
    }
  }

  const deleteCard = async (id: string) => {
    const res = await fetch(`/api/cards/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setCards(cards.filter(c => c._id !== id))
    }
  }

  return (
    <div>
      <table className="min-w-full border border-border text-sm mb-4">
        <thead>
          <tr className="bg-muted">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Words</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card._id}>
              {editingId === card._id ? (
                <>
                  <td className="p-2 border">
                    <input name="id" value={editForm?.id || ''} onChange={handleEditChange} className="border p-1" />
                  </td>
                  <td className="p-2 border">
                    <input name="name" value={editForm?.name || ''} onChange={handleEditChange} className="border p-1" />
                  </td>
                  <td className="p-2 border">
                    <input
                      name="Words"
                      value={Array.isArray(editForm?.Words) ? editForm?.Words.join(', ') : ''}
                      onChange={(e) => setEditForm({ ...(editForm as Card), Words: e.target.value.split(',').map(w => w.trim()) })}
                      className="border p-1"
                    />
                  </td>
                  <td className="p-2 border">
                    <input name="category" value={editForm?.category || ''} onChange={handleEditChange} className="border p-1" />
                  </td>
                  <td className="p-2 border">
                    <button className="mr-2 underline" onClick={() => saveEdit(card._id!)}>Save</button>
                    <button className="underline" onClick={() => { setEditingId(null); setEditForm(null) }}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-2 border">{card.id}</td>
                  <td className="p-2 border">{card.name}</td>
                  <td className="p-2 border">{card.Words?.join(', ')}</td>
                  <td className="p-2 border">{card.category}</td>
                  <td className="p-2 border">
                    <button className="mr-2 underline" onClick={() => startEdit(card)}>Edit</button>
                    <button className="underline" onClick={() => deleteCard(card._id!)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-4">
        <h2 className="mb-2">Add Card</h2>
        <div className="flex gap-2 flex-wrap">
          <input name="id" placeholder="ID" value={form.id} onChange={handleFormChange} className="border p-1" />
          <input name="name" placeholder="Name" value={form.name} onChange={handleFormChange} className="border p-1" />
          <input
            name="Words"
            placeholder="Words comma separated"
            value={Array.isArray(form.Words) ? form.Words.join(', ') : ''}
            onChange={(e) => setForm({ ...form, Words: e.target.value.split(',').map(w => w.trim()) })}
            className="border p-1"
          />
          <input name="category" placeholder="Category" value={form.category} onChange={handleFormChange} className="border p-1" />
          <button className="px-2 border" onClick={createCard}>Add</button>
        </div>
      </div>
    </div>
  )
}
