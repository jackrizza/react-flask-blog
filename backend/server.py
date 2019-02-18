from flask import *
from werkzeug.serving import run_simple
from werkzeug.debug import DebuggedApplication
from routes import sr
from flask_cors import CORS
import ssl


ctx = ssl.SSLContext(ssl.PROTOCOL_SSLv23)
ctx.load_cert_chain('ssl.cert', 'ssl.key')

app = Flask(__name__)
cors = CORS(app, resources={r"/*/*": {"origins": "*"}})
app.register_blueprint(sr)
app = DebuggedApplication(app, evalex=True)

#app.run(debug=True, port=5000)  # run app in debug mode on port 5000
if __name__ == '__main__':
    run_simple('localhost', 5000, app,
               use_reloader=True, use_evalex=True, threaded=True) # ssl_context=ctx
