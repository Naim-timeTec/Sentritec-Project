import { spawn } from "node:child_process";
import http from "node:http";
import fs from "node:fs";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = "file:///c:/Users/Naim/OneDrive%20-%20TimeTec%20Cloud%20Sdn%20Bhd/Documents/PM/SentriTec/web-html/index.html";
const PORT = 9333;
const SELECTOR = process.argv[2] || "#ecosystem";
const OUT = process.argv[3] || "shot-eco.png";

const proc = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars",
  `--remote-debugging-port=${PORT}`, "--window-size=1440,900", URL,
], { stdio: "ignore" });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const getJSON = (path) => new Promise((res, rej) => {
  http.get({ host: "127.0.0.1", port: PORT, path }, (r) => {
    let d = ""; r.on("data", c => d += c); r.on("end", () => res(JSON.parse(d)));
  }).on("error", rej);
});

await sleep(1400);
let target;
for (let i = 0; i < 25; i++) {
  try { const list = await getJSON("/json"); target = list.find(t => t.type === "page"); if (target) break; } catch {}
  await sleep(250);
}

const sock = new (globalThis.WebSocket)(target.webSocketDebuggerUrl);
let id = 0; const pending = new Map();
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); sock.send(JSON.stringify({ id: i, method, params })); });
sock.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } });
await new Promise(r => sock.addEventListener("open", r));

await send("Page.enable");
await send("Runtime.enable");
if (SELECTOR.startsWith("y:")) {
  var yy = parseInt(SELECTOR.slice(2), 10);
  await send("Runtime.evaluate", { expression: `window.scrollTo(0, ${yy});` });
} else {
  await send("Runtime.evaluate", { expression: `document.querySelector(${JSON.stringify(SELECTOR)}).scrollIntoView({block:'center', behavior:'instant'});`, });
}
await sleep(1100);
if (process.argv[4]) { // optional: click a selector before shooting
  await send("Runtime.evaluate", { expression: `document.querySelector(${JSON.stringify(process.argv[4])}).click();` });
  await sleep(500);
}
await sleep(400); // allow reveal + smooth scroll
const shot = await send("Page.captureScreenshot", { format: "png" });
fs.writeFileSync(OUT, Buffer.from(shot.data, "base64"));
console.log("saved", OUT);
sock.close();
proc.kill();
process.exit(0);
