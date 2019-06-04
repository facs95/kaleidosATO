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
  ctx.body = "Welcome to ATO Conference API";
});

// REQUIRE IPFS MODULES
const ipfs = require("./ipfs");

router.get("/get/:path", async ctx => {
  const { path } = ctx.params;
  console.log(path);
  const response = await ipfs.get(path);
  console.log(response);
  ctx.body = {
    data: response
  };
});

//to get operator and minimum amount required
router.post("/add", async ctx => {
  const { content } = ctx.request.body;
  const response = await ipfs.send(content);
  ctx.body = {
    hash: response
  };
});

//minimum value needed for transaction

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 4000);
