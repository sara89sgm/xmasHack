from flask import Flask, request, make_response
import echonest.remix.audio as audio

from audio import config
    config.ECHO_NEST_API_KEY="MXG5OCMN63QJ1C5OM"

app = Flask(__name__)

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
  audiofile_xmas = audio.LocalAudioFile('../XmasHackCloud/public/'+fname_xmas)
  audiofile_mixer = audio.LocalAudioFile('../XmasHackCloud/public/'+fname_mixer)

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

if __name__ == '__main__':
  app.run(host='0.0.0.0',port=8080, debug=True)
