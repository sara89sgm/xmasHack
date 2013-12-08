from flask import Flask, request, make_response
import echonest.remix.audio as audio

app = Flask(__name__)

@app.route('/test')
def return_qtip():
  mp3 = open('backwards.mp3','rb')
  response = make_response(mp3.read())
  response.headers['Content-Type'] = 'audio/mpeg'
  return response

@app.route('/test')
def fetch_mp3():
  enid = requests.args.get('xmas_id')
  fname = requests.args.get('xmas_file')
  print fname
  #af = audio.LocalAudioFile('public/' + fname)
  outfile = 'tmp.mp3'
  cnt = 1
  while os.path.isfile(outfile):
    outfile = 'tmp%d.mp3' % cnt
    cnt+=1
  return jsonify({'path':'/mp3/'+fname})

@app.route('/mp3/<blah>')
def blah():
  mp3 = open('backwards.mp3','rb')
  response = make_response(mp3.read())
  response.headers['Content-Type'] = 'audio/mpeg'
  return response

@app.route('/deezer')
def download_and_mix():
  url = request.args.get('url')
  resp = requests.get(url)

  # get mp3/ save


if __name__ == '__main__':
  app.run(host='0.0.0.0',port=8080, debug=True)
