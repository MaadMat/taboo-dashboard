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
      name: 'words',
      type: 'array',
      fields: [
        {
          name: 'word',
          type: 'text',
        },
      ],
    },
    {
      name: 'category',
      type: 'text',
    },
  ],
}
