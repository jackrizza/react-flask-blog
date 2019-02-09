from flask import *
from routes import sr
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*/*": {"origins": "*"}})
app.register_blueprint(sr)

app.run(debug=True, port=5000)  # run app in debug mode on port 5000
