const { mkdirSync, writeFileSync } = require("fs");
const { join } = require("path");

const APP_GREETING = process.env.APP_GREETING || "Hello, World!";
const MAGIC_WORD = process.env.MAGIC_WORD || "[[ Undefined ]] Come back later!";
const DEMO_COLOR = process.env.DEMO_COLOR || randomHexColor();
const TEXT_COLOR = readableTextColor(DEMO_COLOR);

function randomHexColor() {
  const value = Math.floor(Math.random() * 0xffffff);
  return `#${value.toString(16).padStart(6, "0")}`;
}

function readableTextColor(bgColor) {
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${APP_GREETING}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Sixtyfour+Convergence&family=Sora:wght@100..800&display=swap" rel="stylesheet">
  <style>
    body {
      background-color: ${DEMO_COLOR};
      color: ${TEXT_COLOR};
      font-family: "Sora", sans-serif;
      text-align: center;
      margin-top: 20%;
    }
    .main-text {
      font-family: "Sora", sans-serif;
      font-weight: 400;
      font-size: 1.8em;
      padding: 20px;
    }
    .color-info {
      font-size: .8em;
      margin-top: 20px;
      font-family: "Sixtyfour Convergence", sans-serif;
      font-weight: 400;
      border-radius: 25px;
      background: #000;
      padding: 20px;
      width: 200px;
      height: 150px;
    }
  </style>
</head>
<body>
  <div class="main-text">👋 ${APP_GREETING}</div>
  <div class="main-text">🎨 Demo color: <br/><br/><strong class="color-info">${DEMO_COLOR}</strong></div>
  <div class="main-text">🪄 Magic Word: <br/><br/><strong class="color-info">${MAGIC_WORD}</strong></div>
</body>
</html>`;

const outDir = join(__dirname, "..", "static");
const outFile = join(outDir, "index.html");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, html, "utf8");

console.log(`Wrote static demo page to ${outFile}`);
