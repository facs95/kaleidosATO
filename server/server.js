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
  // generate erc27 token with has as id
  // transfer erc20 coins
  ctx.body = {
    hash,
    address
  };
});

router.post("/validateAttendee", async ctx => {
  const { address } = ctx.request.body;
  //check if he has ERC27 token
  //NO return No ticket
  // yes
  // get hash IPFS from ERC27 id
  // burn erc27
  // get erc20 balance
  const attendeeInfo = ipfs.get(hash);

  const mock = {
    attendeInfo: {
      name: "Freddy",
      lastName: "Caceres",
      email: "facs95@gmail.com"
    },
    credits: 5
  };
  ctx.body = {
    attendeInfo: {
      name: "Freddy",
      lastName: "Caceres",
      email: "facs95@gmail.com"
    },
    credits: 5
  };
});

router.post("/contract/:contractAddress/mint", async ctx => {});

router.post("/contract/:contractAddress/burn", async ctx => {});

router.post("/contract/:contractAddress/transfer", async ctx => {});

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 4000);
