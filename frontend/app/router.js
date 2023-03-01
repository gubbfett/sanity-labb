const koaRouter = require('koa-router')
const PugTemplate = require('./pugTemplate')



module.exports = class Router{
    constructor(sanity){
        this.router = new koaRouter()
        this.sanity = sanity
        this.pugTemplate = new PugTemplate()
    }

    async routeAll(){
        await this.routePages()
        await this.routeRedirects()
    }

    async get404body(){
        return this.pugTemplate.get404()
    }

    async routePages(){
        const pages = await this.sanity.getPages()

        //Setup the menu based on pages
        this.pugTemplate.buildHeader(pages)

        //Reqursive route pages
        function routePages(pages, router, pugTemplate){
            pages.forEach(page => {
                router.get(page.slug, async(ctx, next) => {
                    await next()
                    ctx.body = pugTemplate.getPage(page)
                })

                if(page.children){
                    routePages(page.children, router, pugTemplate)
                }
            })
        }
        //Route them all!
        routePages(pages, this.router, this.pugTemplate)        
    }

    async routeRedirects(){
        const redirects = await this.sanity.getRedirects()
        redirects.forEach(redirect => {
            this.router.redirect(redirect.from, redirect.to);
        })
    }
}