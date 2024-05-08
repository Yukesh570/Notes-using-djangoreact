from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import noteserializer
# Create your views here.


@api_view(['GET'])
def note_data(request):
    note=notes.objects.all().order_by('-updated')
    serializer =noteserializer(note,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_data(request):
    data=request.data
    serializer= noteserializer(data=data)
    if serializer.is_valid():
        serializer.save()
    return Response('added')
# or after  data=request.data
# note= notes.objects.create(
#         body=data['body']
#     )
#     serializer= noteserializer(note,many=False)
#     return Response(serializer.data)

@api_view(['GET'])
def get_data(request,pk):
    note=notes.objects.get(id=pk)
    serializer =noteserializer(note,many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def update_data(request,pk):
    data=request.data
    note=notes.objects.get(id=pk)
    serializer= noteserializer(instance=note, data=data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def delete_data(request,pk):
    note=notes.objects.get(id=pk)
    note.delete()
    return Response('Note is deleted')
