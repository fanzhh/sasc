from .models import Supervise, Defect, DefectAttachment, DefectCorrectAttachment
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator

class SuperviseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supervise
        fields = ('id','ddate','county','name','address',
                'contact','tel','community','lat','lon','grid',
                'grid_person','checker','photo',
                'is_correct','correct_duty_dep',
                'correct_duty_person','correct_date','remark')


class DefectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Defect
        fields = ('id','description','img1','img2',
                'correction','is_correct','remark')


class DefectAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefectAttachment
        fields = ('id','name','img','created','creater')



class DefectCorrectAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefectCorrectAttachment
        fields = ('id','name','img','created','creater')