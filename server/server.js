"use strict";
const Koa = require("koa");
const KoaRouter = require("koa-router");
const bodyParser = require("koa-bodyparser");
const json = require("koa-json");
const cors = require("@koa/cors");
const ipfs = require("./ipfs");
const contract = require("./contracts");
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
  const isMint = await contract.mintToken(address, hash);
  const transferCredits = await contract.transferCredits(address, "5");
  ctx.body = {
    hash,
    address,
    mintStatus: isMint,
    creditStatus: transferCredits
  };
});

router.get("/validateAttendee/:address", async ctx => {
  const { address } = ctx.params;
  const balance = await contract.getBalanceTicket(address);
  let data;
  let hasTicket;
  if (balance < 1) {
    hasTicket = false;
    data = {
      hasTicket,
      attendeeInfo: {}
    };
  } else {
    hasTicket = true;
    let URI = await contract.getURI(address);
    let attendeePrimaryInfoString = await ipfs.get(URI);
    const attendeePrimaryInfoObj = JSON.parse(attendeePrimaryInfoString);
    let credits = await contract.getBalanceCredits(address);
    data = {
      attendeeInfo: {
        hasTicket,
        firstName: attendeePrimaryInfoObj.name,
        lastName: attendeePrimaryInfoObj.lastName,
        email: attendeePrimaryInfoObj.email,
        credits
      }
    };
  }
  ctx.body = data;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 4000);
