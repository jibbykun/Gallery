#!/usr/bin/env node

const Koa = require('koa')
const Router = require('koa-router')
const stat = require('koa-static')
const Database = require('sqlite-async')
const handlebars = require('koa-hbs-renderer')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()
app.use(stat('public'))
app.use(bodyParser())
app.use(handlebars({ paths: { views: `${__dirname}/views` } }))
app.use(router.routes())
app.use(bodyParser())



const port = 8080
const dbName = 'gallerydb.db'



router.get('/', async ctx => await ctx.render('galleryInterface'))
router.get('/test', async ctx => await ctx.render('test'))
router.get('/about', async ctx => await ctx.render('about'))
router.get('/register', async ctx => await ctx.render('register'))
router.get('/login', async ctx => await ctx.render('login'))

router.post('/register', async ctx => {
	try {
		console.log(ctx.request.body)
		const body = ctx.request.body
		if (body.password != body.passwordRepeat)
		{
			ctx.redirect("/")
		}
		const sql = `INSERT INTO users(username, password) 
			VALUES("${body.username}", "${body.password}");`
		console.log(sql)
		const db = await Database.open(dbName)
		await db.run(sql)
		await db.close()
		ctx.redirect('/')
	} catch(err) {
		ctx.body = err.message
	}
})


module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
