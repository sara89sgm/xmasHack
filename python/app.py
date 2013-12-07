from flask import Flask, request, make_response

app = Flask(__name__)

@app.route('/test')
def return_qtip():
  mp3 = open('qtip.mp3','rb')
  response = make_response(mp3.read())
  response.headers['Content-Type'] = 'audio/mpeg'
  return response

if __name__ == '__main__':
  app.run(host='0.0.0.0',port=8080, debug=True)
