from echonest.remix.audio import config
config.ECHO_NEST_API_KEY="MXG5OCMN63QJ1C5OM"
import echonest.remix.audio as audio
import math
import pdb

#audiofile = audio.LocalAudioFile('qtip.mp3')

f1 = '../XmasHackCloud/public/678465_orig.mp3'
f2 = '../XmasHackCloud/public/61700774_orig.mp3'

af1 = audio.LocalAudioFile(f1)
af2 = audio.LocalAudioFile(f2)

beats1 = af1.analysis.beats
bars1 = af1.analysis.bars
beats2 = af2.analysis.beats
bars2 = af2.analysis.bars

#pdb.set_trace()
out = audio.AudioData(shape = (44100*30,2),
    sampleRate = af1.sampleRate,
    numChannels = 2
    )
mm = audio.mix(af2[beats2[0]:beats2[-1]],af1)
#mm = audio.mix(af2[beats2[0]:beats2[2]],af2)
out.append(mm)
#mm = audio.mix(af1[beats1[0]:beats1[-1]],af2)
#mm = audio.mix(af1[beats1[0]:beats1[2]],af1)
#out.append(mm)
out.encode('../XmasHackCloud/public/tmpmmp.wav')

