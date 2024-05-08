from rest_framework import serializers
from .models import *

class noteserializer(serializers.ModelSerializer):
    class Meta:
        model= notes
        fields='__all__'