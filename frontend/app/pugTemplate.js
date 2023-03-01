const pug = require('pug')
const toHTML = require('@portabletext/to-html')

module.exports = class PugTemplate{
    constructor(){
        this.pug = pug
        this.headerHTML = '';
    }

    buildHeader(menu){
        this.headerHTML = this.pug.renderFile('./views/partials/header.pug', {
            menu: menu
        })
    }

    get404(){
        return pug.renderFile('./views/layouts/layout.pug', {
            headerHtml: this.headerHTML,
            content: pug.renderFile('./views/layouts/404.pug', {
                
            })
        })
    }

    getPage(page){
        page.htmlcontent = toHTML.toHTML(page.content, {})

        return pug.renderFile('./views/layouts/layout.pug', {
            headerHtml: this.headerHTML,
            content: pug.renderFile('./views/layouts/page.pug', {
                page: page
            })
        })
    }
}