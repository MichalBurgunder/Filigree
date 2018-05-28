from django.contrib import admin
from project.analyzer.models import Text, AnalysisHistory, Batch, UserProfile

admin.site.register(Batch)
admin.site.register(Text)
admin.site.register(AnalysisHistory)
admin.site.register(UserProfile)
