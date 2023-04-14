from django.urls import path
from polls.views import detect_emotion_view

urlpatterns = [
    # path('', upload_audio_view, name='upload_audio'),
    path('', detect_emotion_view, name='detect_emotion'),
]
