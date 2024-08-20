from django.shortcuts import render


# views.py
from django.shortcuts import render
from django.http import JsonResponse
from .models import UploadedFile

def file_upload_view(request):
    if request.method == 'POST':
        for file in request.FILES.getlist('files'):
            UploadedFile.objects.create(file=file)
        return JsonResponse({'message': 'Files uploaded successfully!'})
    return render(request, 'index.html')


def index(request):
    return render(request, "index.html")