from django.urls import path
from . import views

urlpatterns=[

    path('notes/',views.note_data,name="notes" ),
    path('get_data/add_data/',views.add_data,name="add_data" ),

    path('get_data/<str:pk>/update',views.update_data,name="update_data" ),
    path('get_data/<str:pk>/delete',views.delete_data,name="delete_data" ),

    path('get_data/<str:pk>/',views.get_data,name="get_data" ),


]