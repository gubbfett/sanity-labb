const Router = require('./router')
const koa = require('koa')
const sanityConnector = require('./sanityConnector')
const config = require('config')

module.exports = class App {
    constructor(){
        this.sanityConnector = new sanityConnector()
        this.router = new Router(this.sanityConnector)
        this.webserver = new koa()

        this.listenForSanityChanges()
    }

    async listenForSanityChanges(){
        this.sanityConnector.client.listen(`${config.sanity.listen_query}`, {}, () => {}).subscribe(async update => {
            console.log(`Detected change in Sanity schema, waiting ${config.sanity.listen_delay_ms / 1000} seconds...`)
            await new Promise(resolve => setTimeout(resolve, config.sanity.listen_delay_ms));
            console.log('....and fetching new information!')

            this.reRouteFromSanity()
        })
    }

    async reRouteFromSanity(){
        //Reset router
        this.router.router.stack.length = 0
        //Get pages, route them and pug them
        await this.router.routeAll()
        this.webserver.use(this.router.router.routes())
    }

    async start(){
        try{        
            this.reRouteFromSanity()
            //Handle 404 requests
            this.webserver.use(async (ctx, next) => {
                await next()
                if (ctx.status === 404) {
                    ctx.status = 404
                    ctx.body = await this.router.get404body()
                }
            })

        } catch (e) {
            console.log(e)
        } finally {
            this.webserver.listen(config.app.port)
            console.log(`Webserver is now running on port ${config.app.port}`)
        }
    }
}