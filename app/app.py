from http.server import BaseHTTPRequestHandler, HTTPServer
import random

class HelloWorldHandler(BaseHTTPRequestHandler):
    def generate_random_color(self):
        """Generate a random color in HEX format."""
        return "#{:02x}{:02x}{:02x}".format(
            random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)
        )
    
    def determine_readable_text_color(self, bg_color):
        """Determine a readable text color based on background color."""
        # Convert HEX color to RGB
        r = int(bg_color[1:3], 16)
        g = int(bg_color[3:5], 16)
        b = int(bg_color[5:7], 16)
        # Calculate luminance
        luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
        # Return black for bright background, white for dark background
        return "#000000" if luminance > 0.5 else "#FFFFFF"

    def do_GET(self):
        # Generate a random background color
        background_color = self.generate_random_color()
        text_color = self.determine_readable_text_color(background_color)
        
        # Generate HTML content
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <title>Hello, World!</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Sixtyfour+Convergence&family=Sora:wght@100..800&display=swap" rel="stylesheet">
            <style>
                body {{
                    background-color: {background_color};
                    color: {text_color};
                    font-family: "Sora", sans-serif;
                    text-align: center;
                    margin-top: 20%;
                }}
                .main-text {{
                    font-family: "Sora", sans-serif;
                    font-weight: 400;
                    font-size: 2.5em;
                }}
                .color-info {{
                    font-size: 1.5em;
                    margin-top: 20px;
                    font-family: "Sixtyfour Convergence", sans-serif;
                    font-weight: 400;
                }}
            </style>
        </head>
        <body>
            <div class="main-text">Hello, World!</div>
            <div class="main-text">Color of the day: <strong class="color-info">{background_color}</strong></div>
        </body>
        </html>
        """

        # Send HTTP response
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(html_content.encode("utf-8"))

# Set up the server
def run(server_class=HTTPServer, handler_class=HelloWorldHandler):
    server_address = ('', 9000)
    httpd = server_class(server_address, handler_class)
    print("Starting httpd server on port 9000...")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
