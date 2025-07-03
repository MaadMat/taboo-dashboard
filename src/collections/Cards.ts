import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Cards: CollectionConfig = {
  slug: 'cards',
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      // Stored as `Words` in the existing database
      name: 'Words',
      label: 'Words',
      type: 'text',
      hasMany: true,
    },
    {
      name: 'category',
      type: 'text',
    },
  ],
}
