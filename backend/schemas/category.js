export default {
    name: 'category',
    type: 'document',
    title: 'Category',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name'
        },
        {
            name: 'slug',
            type: 'string',
            title: 'Slug'
        },
        {
            name: 'parent',
            title: 'Parent',
            type: 'reference',
            to: [{type: 'category'}]
        }
    ]
}