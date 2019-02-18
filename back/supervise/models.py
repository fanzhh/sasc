from django.db import models
from datetime import datetime
from django.contrib.auth.models import User
from django.utils.translation import ugettext, ugettext_lazy as _


class Supervise(models.Model):
    ddate = models.DateField()                  # 督导时间
    county = models.CharField(max_length=100)   # 区县
    name = models.CharField(max_length=300)     # 被检查单位名称
    address = models.CharField(max_length=300)  # 被检查单位地址
    contact = models.CharField(max_length=20)   # 联系人
    tel = models.CharField(max_length=20)       # 联系电话
    community = models.CharField(max_length=50) # 街道
    lat = models.FloatField(_('Latitude'),blank=True,null=True) # 经度
    lon = models.FloatField(_('Longitde'),blank=True,null=True) # 纬度
    grid = models.CharField(max_length=20,null=True,blank=True)      # 网格
    grid_person = models.CharField(max_length=20,null=True,blank=True) # 网格员
    checker = models.CharField(max_length=200)  # 督导人员
    photo = models.ImageField(upload_to='media/supervise/',null=True,blank=True)
    is_correct = models.BooleanField(default=False) # 是否整改
    correct_duty_dep = models.CharField(max_length=100) # 整改责任单位
    correct_duty_person = models.CharField(max_length=20) # 整改责任人
    correct_date = models.DateField(null=True,blank=True) # 整改确认日期
    remark = models.CharField(max_length=100,null=True,blank=True)   # 备注
    created = models.DateTimeField(default=datetime.now, blank=True) 
    creater = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.ddate.strftime('%Y-%m-%d') + ',' + self.county + ',' + self.community + ',' + self.name


class Defect(models.Model):
    supervise = models.ForeignKey(Supervise, on_delete=models.CASCADE, related_name='supervise')
    description = models.CharField(max_length=500)  # 问题描述
    img1 = models.ImageField(upload_to='media/supervise/',null=True,blank=True) # 照片1
    img2 = models.ImageField(upload_to='media/supervise/',null=True,blank=True) # 照片2
    correction = models.TextField(null=True,blank=True) # 整改情况
    is_correct = models.BooleanField(default=False) # 是否整改
    remark = models.CharField(max_length=100,null=True,blank=True)   # 备注
    created = models.DateTimeField(default=datetime.now, blank=True) 
    creater = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.supervise.ddate.strftime('%Y-%m-%d') + self.supervise.county + self.supervise.name + self.description



# 问题附件
class DefectAttachment(models.Model):
    defect = models.ForeignKey(Defect, on_delete=models.CASCADE, related_name='defect')
    name = models.CharField(max_length=100) # 附件名称
    img = models.ImageField(upload_to='media/defect/') # 照片
    created = models.DateTimeField(default=datetime.now, blank=True)
    creater = models.ForeignKey(User, on_delete=models.CASCADE,null=True,blank=True)
    remark = models.CharField(max_length=100,null=True,blank=True)



# 问题整改附件，单独列出，因为考虑到这个表由县区局人员更新
class DefectCorrectAttachment(models.Model):
    defect = models.ForeignKey(Defect, on_delete=models.CASCADE, related_name='defect2')
    name = models.CharField(max_length=100) # 附件名称
    img = models.ImageField(upload_to='media/defect/') # 照片
    created = models.DateTimeField(default=datetime.now, blank=True)
    creater = models.ForeignKey(User, on_delete=models.CASCADE,null=True,blank=True)
    remark = models.CharField(max_length=100,null=True,blank=True)
