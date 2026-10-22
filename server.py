import http.server, socketserver, os, sys
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
DIR = os.path.dirname(os.path.abspath(__file__))

class H(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS, HEAD')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Access-Control-Expose-Headers', 'Content-Length, Content-Range')
        super().end_headers()
    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()
    def log_message(self, fmt, *args):
        print(f'[{self.log_date_time_string()}] {self.address_string()} {fmt % args}', flush=True)

socketserver.TCPServer.allow_reuse_address = True
print(f'WebGame rodando em http://localhost:{PORT}  (dir: {DIR})', flush=True)
print('Para parar: Ctrl+C', flush=True)
socketserver.TCPServer(('', PORT), H).serve_forever()
