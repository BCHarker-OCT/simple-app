from http.server import BaseHTTPRequestHandler, HTTPServer

class HelloWorldHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/plain")
        self.end_headers()
        self.wfile.write(b"Hello, World!\n")

# Set up the server
def run(server_class=HTTPServer, handler_class=HelloWorldHandler):
    server_address = ('', 9000)
    httpd = server_class(server_address, handler_class)
    print("Starting httpd server on port 9000...")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
