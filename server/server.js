"use strict";
const koa = require("koa");
const koaRouter = require("koa-router");
const bodyParser = require("koa-bodyparser");
const json = require("koa-json");
const cors = require("@koa/cors");

const app = new koa();
const router = new koaRouter();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
});

app.on("error", (err, ctx) => {
  console.error(err);
});

app.use(json());
app.use(bodyParser());
app.use(cors());

router.get("/", async ctx => {
  ctx.body = "Welcome to Fonbnk Services API";
});

router.get("/get/:path", async ctx => {
  const { to, amount, currency } = ctx.params;
});

//to get operator and minimum amount required
router.post("/add", async ctx => {
  const { content } = ctx.body;
  try {
    const data = JSON.stringify(content);
    const contentToSend = ipfsClient.Buffer.from(data);
    const results = await ipfs.add(contentToSend);
    console.log(results);
  } catch (err) {
    console.log(err);
  }
  console.log();
});

//minimum value needed for transaction

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 4000);
