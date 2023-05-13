from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


from io import BytesIO
from flask import jsonify, request, send_file

@app.route('/url_route', methods=['POST'])
def upload_file():
    """Handles the upload of a file."""
    d = {}
    try:
        style = request.args.get('style')
        print(style)
        file = request.files['file_from_react']
        filename = file.filename
        print(f"Uploading file {filename}")
        file.save(f"./{filename}")
        d['status'] = 1
        d['img_url'] = "http://localhost:3000/img/1.jpg"

    except Exception as e:
        print(f"Couldn't upload file {e}")
        # d['status'] = 0

    return jsonify(d)