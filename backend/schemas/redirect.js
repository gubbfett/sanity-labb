export default {
    name: 'redirect',
    type: 'document',
    title: 'Redirect',
    fields: [
        {
            name: 'from',
            type: 'string',
            title: 'From',
            description: 'Example: /my-old-url'
        },
        {
            name: 'to',
            type: 'string',
            title: 'To',
            description: 'Example: /my-new-url'
        }
    ]
}