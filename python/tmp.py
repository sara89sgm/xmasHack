import echonest.remix.audio as audio
audiofile = audio.LocalAudioFile('qtip.mp3')

beats = audiofile.analysis.beats
beats.reverse()
audio.getpieces(audiofile,beats).encode('backwards.mp3')
