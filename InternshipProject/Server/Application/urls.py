from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from Application import views
from django.contrib import admin
from django.urls import path

router = DefaultRouter()
router.register(r'Employee', views.EmployeeViewSet)

urlpatterns = [
    path('Admin/', admin.site.urls),
    url(r'^', include(router.urls))
]
