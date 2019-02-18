from django.conf.urls import url
from . import views

urlpatterns = [
        url(r'getattachmentsbysupervise/(?P<pk>\d+)/$',views.GetDefectAttachmentsBySupervise),
        url(r'supervises/$', views.SuperviseList.as_view()),
        url(r'supervises/(?P<pk>\d+)/$', views.SuperviseDetail.as_view()),
        url(r'supervise/(?P<pk>\d+)/$', views.SuperviseDetail.as_view()),
        #url(r'supervise/$', views.SuperviseDetail.as_view()),
        url(r'supervisewithdefects/(?P<pk>\d+)/$',views.GetSuperviseWithDefects),
        url(r'defects/(?P<pk>\d+)/$', views.DefectListBySupervise),
        url(r'defectswithsupervise/$', views.DefectAllList),
        url(r'defects2/(?P<supervise_id>\d+)/$', views.DefectList.as_view()),
        url(r'defect/(?P<pk>\d+)/$', views.DefectDetail.as_view()),
        url(r'defectattachments/(?P<defect_id>\d+)/$',views.DefectAttachmentList.as_view()),
        url(r'defectattachment/(?P<pk>\d+)/$', views.DefectAttachmentDetail.as_view()),
        url(r'defectcorrectattachments/(?P<defect_id>\d+)/$',views.DefectCorrectAttachmentList.as_view()),
        url(r'defectcorrectattachment/(?P<pk>\d+)/$', views.DefectCorrectAttachmentDetail.as_view()),
]
