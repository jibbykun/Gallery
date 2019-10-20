#!/usr/bin/env node

const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const views = require('koa-views')
app.use(require('koa-static')('public'))
const port = 8080

app.use(views(`${__dirname}/html`, { extension: 'html' }, {map: { handlebars: 'handlebars' }}))

router.get('/', async ctx => await ctx.render('galleryInterface'))
router.get('/test', async ctx => await ctx.render('test'))
router.get('/about', async ctx => await ctx.render('about'))

app.use(router.routes())
module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
