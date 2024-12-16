import http from "http";
import { randomInt } from "crypto";

// Load environment variables
const PORT = parseInt(process.env.PORT || "9000", 10);
const APP_GREETING = process.env.APP_GREETING || "Hello, World!";
const MAGIC_WORD = process.env.MAGIC_WORD || "[[ Undefined ]]<br/>Come back later!"

class HelloWorldServer {
  // Generate a random color in HEX format
  static generateRandomColor(): string {
    const r = randomInt(0, 256);
    const g = randomInt(0, 256);
    const b = randomInt(0, 256);
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  // Determine a readable text color based on background color
  static determineReadableTextColor(bgColor: string): string {
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  }

  static handleRequest(req: http.IncomingMessage, res: http.ServerResponse): void {
    if (req.method === "GET") {
      const backgroundColor = HelloWorldServer.generateRandomColor();
      const textColor = HelloWorldServer.determineReadableTextColor(backgroundColor);

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${APP_GREETING}</title>
            <meta charset="UTF-8">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Sixtyfour+Convergence&family=Sora:wght@100..800&display=swap" rel="stylesheet">
            <style>
                body {
                    background-color: ${backgroundColor};
                    color: ${textColor};
                    font-family: "Sora", sans-serif;
                    text-align: center;
                    margin-top: 20%;
                }
                .main-text {
                    font-family: "Sora", sans-serif;
                    font-weight: 400;
                    font-size: 1.5em;
                    padding: 20px;
                }
                .color-info {
                    font-size: .5em;
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
            <div class="main-text">🎨 Color of the day: <br/><br/><strong class="color-info">${backgroundColor}</strong></div>
            <div class="main-text">🪄 Magic Word: <br/><br/><strong class="color-info">${MAGIC_WORD}</strong></div>
        </body>
        </html>
      `;

      res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
      res.end(htmlContent);
  } else {
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("Method Not Allowed");
  }
}
}

// Start the server
const server = http.createServer(HelloWorldServer.handleRequest);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
