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
        const pages = await this.client.fetch('*[_type == "page"] | order(menuorder asc)')
        //console.log(pages)
        pages.forEach(page => {
            page.content = ""
            
            page.slug = page.slug == null || typeof(page.slug) == 'undefined' ? '/' : '/'+page.slug.current
            page.children = []
        })

        function makeTree(data) {
            const tree = [];
            const mappedData = {};
            
            data.forEach(item => {
              const id = item._id;
              mappedData[id] = { ...item, children: [] };
            });
            
            Object.keys(mappedData).forEach(id => {
              const item = mappedData[id];
              const parentId = item.parent?._ref;
          
              if (parentId) {
                mappedData[parentId].children.push(item);
                item.slug = mappedData[parentId].slug + item.slug;
              } else {
                tree.push(item);
              }
            });
            
            return tree;
          }

        return makeTree(pages);
    }

    async getRedirects(){
        return await this.client.fetch('*[_type == "redirect"]')
    }
}