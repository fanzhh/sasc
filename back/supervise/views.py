from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework import permissions
from django.http import HttpResponse, JsonResponse
from .models import Supervise, Defect, DefectAttachment, DefectCorrectAttachment
from .serializers import SuperviseSerializer, DefectSerializer, DefectAttachmentSerializer, DefectCorrectAttachmentSerializer
from .permissions import IsOwnerOrReadOnly
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from django.contrib.auth.middleware import get_user
from rest_framework.request import Request
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from django.forms.models import model_to_dict
from django.db.models.fields.files import ImageFieldFile
import json 
from rest_framework import serializers


class DefectCorrectAttachmentList(generics.ListCreateAPIView):
    queryset = DefectCorrectAttachment.objects.all()
    serializer_class = DefectCorrectAttachmentSerializer
    permission_classes = (IsOwnerOrReadOnly,)

    def perform_create(self, serializer):
        defect = Defect.objects.get(id=self.kwargs['defect_id'])
        img = self.request.data.get('img')
        serializer.save(creater=self.request.user,defect=defect,img=img)

    def get_query(self):
        defect = self.kwargs['defect_id']
        return DefectCorrectAttachment.objects.filter(defect__id=defect)



class DefectAttachmentList(generics.ListCreateAPIView):
    queryset = DefectAttachment.objects.all()
    serializer_class = DefectAttachmentSerializer
    permission_classes = (IsOwnerOrReadOnly,)

    def perform_create(self, serializer):
        user = self.request.user
        defect = Defect.objects.get(id=self.kwargs['defect_id'])
        img = self.request.data.get('img')
        serializer.save(creater=user,defect=defect,img=img)

    def get_query(self):
        defect = self.kwargs['defect_id']
        return DefectAttachment.objects.filter(defect__id=defect)



class SuperviseList(generics.ListCreateAPIView):
    queryset = Supervise.objects.all().order_by('-ddate')
    serializer_class = SuperviseSerializer
    permission_classes = (IsOwnerOrReadOnly,)

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_authenticated:
            photo = self.request.data.get('photo')
            if photo:
                serializer.save(creater=user,photo=photo)
            else:
                serializer.save(creater=user)
            

class SuperviseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Supervise.objects.all()
    serializer_class = SuperviseSerializer
    permission_classes = (IsOwnerOrReadOnly,)


class DefectList(generics.ListCreateAPIView):
    queryset = Defect.objects.all()
    serializer_class = DefectSerializer
    permission_classes = (IsOwnerOrReadOnly,)
    #permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        user = self.request.user
        supervise = Supervise.objects.get(id=self.kwargs['supervise_id'])
        serializer.save(creater=user,supervise=supervise)

    def get_query(self):
        supervise = self.kwargs['supervise']
        return Defect.objects.filter(supervise__id=supervise)


class DefectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Defect.objects.all()
    serializer_class = DefectSerializer
    permission_classes = (IsOwnerOrReadOnly,)


@api_view(['GET',])
def DefectAllList(request):
    query = Defect.objects.all().values('id','supervise__id','supervise__ddate','supervise__county','supervise__community','supervise__name','description','is_correct').order_by('-supervise_id')
    return JsonResponse(list(query), safe=False)


@api_view(['GET',])
def DefectListBySupervise(request,pk):
    supervise = Supervise.objects.get(pk=pk)
    query = Defect.objects.filter(supervise=supervise).values()
    return JsonResponse(list(query), safe=False)



@api_view(['GET',])
def GetSuperviseWithDefects(request,pk):
    supervise = Supervise.objects.get(pk=pk)
    defects = Defect.objects.filter(supervise=supervise).values()
    supervise_obj = model_to_dict(supervise)
    supervise_obj['defects'] = list(defects)
    supervise_obj['photo'] = str(supervise_obj['photo'])
    return Response(supervise_obj)


@api_view(['GET',])
def GetDefectAttachmentsBySupervise(request,pk):
    result = []
    supervise = Supervise.objects.get(pk=pk)
    defects = Defect.objects.filter(supervise=supervise)
    for defect in defects:
        description_attachments = DefectAttachment.objects.filter(defect=defect)
        correction_attachments = DefectCorrectAttachment.objects.filter(defect=defect)
        description_attachment_list = []
        correction_attachment_list = []
        for attachment in description_attachments:
            obj = {}
            obj['id'] = attachment.id
            obj['name'] = attachment.name
            obj['img'] = attachment.img.url if attachment.img else None
            description_attachment_list.append(obj)
        for attachment in correction_attachments:
            obj = {}
            obj['id'] = attachment.id
            obj['name'] = attachment.name
            obj['img'] = attachment.img.url if attachment.img else None
            correction_attachment_list.append(obj)
        result.append({'id':defect.id,'description':description_attachment_list,'correct':correction_attachment_list})
    return Response(result)



class DefectAttachmentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = DefectAttachment.objects.all()
    serializer_class = DefectAttachmentSerializer
    permission_classes = (IsOwnerOrReadOnly,)



class DefectCorrectAttachmentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = DefectCorrectAttachment.objects.all()
    serializer_class = DefectCorrectAttachmentSerializer
    permission_classes = (IsOwnerOrReadOnly,)