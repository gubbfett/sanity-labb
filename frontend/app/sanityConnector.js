const sanity = require('@sanity/client');
const config = require('config')

module.exports = class SanityConnector{
    constructor(){
        this.projectId = config.sanity.project_id
        this.dataset = config.sanity.dataset

        this.client = sanity.createClient({
            projectId: this.projectId,
            dataset: this.dataset,
            useCdn: false,
            apiVersion: '2022-01-12',
        })
    }

    async getPages(){
        const pages = await this.client.fetch('*[_type == "page"] | order(menuorder asc) {name, slug, parent->{name, slug, "parent": parent->slug}, menuorder, content, description, image, category, hideInMenu}')
        
        pages.forEach(page => {
            if(typeof(page.hideInMenu) == 'object'){
                page.hideInMenu = false;
            }
        })

        function createTree(data, parentSlug = null) {
            const nodes = data.filter(node => {
                if (parentSlug === null) {
                    return node.parent === parentSlug;
                } else {
                    return node.parent && node.parent.slug === parentSlug;
                }
            });
    
            const tree = nodes.map(node => {
                const { parent, ...child } = node;
                const children = createTree(data, node.slug);
                if (children.length > 0) {
                    child.children = children;
                } else {
                    child.children = []
                }
                if (parentSlug !== null) {
                    const grandparentSlug = parent && parent.parent ? `${parent.parent}` : '';
                    child.slug = `${grandparentSlug}${parentSlug}${child.slug}`;
                }
                return child;
            });
    
            return tree;
        }

        return createTree(pages);

    }

    async getRedirects(){
        return await this.client.fetch('*[_type == "redirect"]')
    }
}