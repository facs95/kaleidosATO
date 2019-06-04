"use strict";
const Koa = require("koa");
const KoaRouter = require("koa-router");
const bodyParser = require("koa-bodyparser");
const json = require("koa-json");
const cors = require("@koa/cors");
const ipfs = require("./ipfs");
const nodeConnection = require("./nodeConnection");
const app = new Koa();
const router = new KoaRouter();

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

// -----------IPFS ENPOINTS-------------
router.get("/get/:path", async ctx => {
  const { path } = ctx.params;
  const data = await ipfs.get(path);
  ctx.body = {
    data
  };
});

router.post("/add", async ctx => {
  const { content } = ctx.request.body;
  const hash = await ipfs.send(content);
  ctx.body = {
    hash
  };
});

// ----------------------------------------

// ----- GENERATE ADDRESS FOR ATTE
router.post("/address", async ctx => {
  const { password } = ctx.request.body;
  const address = await nodeConnection.generateAddress(password);
  ctx.body = {
    address
  };
});

router.post("/newAttendee", async ctx => {
  const { password, content } = ctx.request.body;
  const hash = await ipfs.send(content);
  const address = await nodeConnection.generateAddress(password);
  ctx.body = {
    hash,
    address
  };
});

router.post("/contract/:contractAddress/mint", async ctx => {});

router.post("/contract/:contractAddress/burn", async ctx => {});

router.post("/contract/:contractAddress/transfer", async ctx => {});

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 4000);
