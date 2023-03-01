export default {
    name: 'page',
    type: 'document',
    title: 'Page',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name'
        },
        {
            title: 'Content', 
            name: 'content',
            type: 'array', 
            of: [{type: 'block'}]
        },
        {
            name: 'slug',
            type: 'string',
            title: 'slug'
        },
        {
            name: 'menuorder',
            type: 'number',
            title: 'Menu order'
        },
        {
            name: 'description',
            type: 'text',
            title: 'Description'
        },
        {
            name: 'image',
            type: 'image',
            title: 'Image'
        },
        {
            name: 'parent',
            title: 'Parent page',
            type: 'reference',
            to: [{type: 'page'}]
        },
        {
            name: 'category',
            title: 'Category',
            type: 'array',
            of: [{
                type: 'reference',
                to: [{type: 'category'}]
            }]
        },
        {
            name: 'hideInMenu',
            title: 'Hide in menu',
            type: 'boolean'
        }
    ]
  }