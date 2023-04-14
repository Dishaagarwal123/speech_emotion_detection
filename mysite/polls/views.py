import io
import os
import tempfile
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from .emotion_detection import detect_emotion
from django.shortcuts import render
from pydub import AudioSegment
from pydub.exceptions import CouldntDecodeError


@csrf_exempt
def detect_emotion_view(request):
    if request.method == 'POST':
        audio_file = request.FILES.get('audio_file', None)
        if audio_file:
            # Convert the audio file to WAV format
            try:
                with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as temp_audio_file:
                    temp_audio_file.write(audio_file.read())
                    temp_audio_file.flush()
                    audio_content = AudioSegment.from_file(temp_audio_file.name, format="wav").export(format="wav").read()
                os.unlink(temp_audio_file.name)
            except CouldntDecodeError:
                return HttpResponseBadRequest('Audio file could not be read as PCM WAV, AIFF/AIFF-C, or Native FLAC; check if file is corrupted or in another format.')
            except Exception:
                return HttpResponseBadRequest('Error occurred while converting audio file to WAV format.')
            
            result = detect_emotion(audio_content)
            # return the result as a JSON response
            return JsonResponse({'result': result})
        else:
            # return an error response if no audio file is provided 
            return HttpResponseBadRequest('No audio file provided.')
    elif request.method == 'GET':
        return render(request, 'index.html')   
    else:
        # return an error response if the request method is not POST
        return HttpResponseNotAllowed(['PUT','POST'])
