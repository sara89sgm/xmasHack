from flask import Flask, request, make_response, jsonify
import echonest.remix.audio as audio
from echonest.remix.audio import config
import os
import requests

config.ECHO_NEST_API_KEY="MXG5OCMN63QJ1C5OM"

app = Flask(__name__)

AUDIO_DIR = '../XmasHackCloud/public/'

@app.route('/test3')
def return_qtip():
  mp3 = open('backwards.mp3','rb')
  response = make_response(mp3.read())
  response.headers['Content-Type'] = 'audio/mpeg'
  return response

@app.route('/test')
def fetch_mp3():
  fname_xmas = requests.args.get('xmas_file')
  fname_mixer = requests.args.get('mixer_file')
  print fname

  # This takes your input track, sends it to the analyzer, and returns the results.  
  audiofile_xmas = audio.LocalAudioFile(AUDIO_DIR+fname_xmas)
  audiofile_mixer = audio.LocalAudioFile(AUDIO_DIR+fname_mixer)

  # This gets a list of every bar in the track.  
  # You can manipulate this just like any other Python list!
  bars_xmas = audiofile_xmas.analysis.bars
  bars_mixer = audiofile_mixer.analysis.bars

  # This makes a new list of "AudioQuantums".  
  # Those are just any discrete chunk of audio:  bars, beats, etc
  collect = audio.AudioQuantumList()

  # This loop puts the first item in the children of each bar into the new list. 
  # A bar's children are beats!  Simple as that. 
  bars = bars_xmas if (len(bars_xmas) > len(bars_mixer)) else bars_mixer

  for bar in bars:
      collect.append(bar.children()[0])

  # This assembles the pieces of audio defined in collect from the analyzed audio file.
  out = audio.getpieces(audiofile, collect)
  
  # This writes the newly created audio to the given file.  
  out.encode(output_filename)
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

def url_to_file(url):
  dz_id = url.split('/')[-1]
  if not dz_id.endswith('.mp3'):
    dz_id += '.mp3'
  return AUDIO_DIR + dz_id

def process_mix(fin,fout):
  af = audio.LocalAudioFile(fin)
  horn = audio.LocalAudioFile(AUDIO_DIR + 'airhorn.wav')
  out = audio.AudioData()
  #out.append([b for b in horn.analysis.bars])
  #audio.getpieces(af,out).encode(fout)
  #audio.getpieces(j

@app.route('/audio/<fname>')
def return_audio(fname):
  # TODO find static method...
  fname = AUDIO_DIR + fname
  mp3 = open(fname,'rb')
  response = make_response(mp3.read())
  response.headers['Content-Type'] = 'audio/mpeg'
  return response

@app.route('/deezer',methods=['POST'])
def download_and_mix():
  #url = request.json['url']
  #url = request.form['url']
  url = request.args.get('url')
  mix_id = request.args.get('id')
  is_xmas = request.args.get('type')

  if not url or not mix_id:
    return 'broken'

  #check to see if exists locally
  #out_f = url_to_file(url)
  mix_f = AUDIO_DIR + mix_id + '_mix.mp3'
  out_f = AUDIO_DIR + mix_id + '_orig.mp3'

  if os.path.isfile(mix_f):
    return jsonify({'url':'/audio/'+mix_id+'_mix.mp3'})

  if not os.path.isfile(out_f):
    fid = open(out_f,'wb')
    resp = requests.get(url)
    for block in resp.iter_content(1024):
      if not block:
        break
      fid.write(block)
    fid.close()

  print is_xmas

  if not is_xmas:
    return jsonify({'url':''})
  
  process_mix(out_f,mix_f)
  # DO SOME MIXING!

  return jsonify({'url':'/audio/'+mix_id+'_mix.mp3'})
  # get mp3/ save

if __name__ == '__main__':
  app.run(host='0.0.0.0',port=8080, debug=True)
