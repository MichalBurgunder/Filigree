

from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView, TokenRefreshView

from project.api.views import GeneralBatch1, GeneralText, DeleteBatch, AnalysisHistoryView, AnalyzeBatch, \
    RegistrationView, \
    RegistrationValidationView, AnalyzeText, ForgottenPasswordView, DeleteText, \
    DeleteAccountView

app_name = 'api'


urlpatterns = [

    # TOKEN ################################
    # DONE
    path(
        route='token/',
        view=TokenObtainPairView.as_view(),
        name='token_obtain_pair'
    ),
    path(
        route='token/refresh/',
        view=TokenRefreshView.as_view(),
        name='token_refresh'
    ),
    # DONE
    path(
        route='token/verify/',
        view=TokenVerifyView.as_view(),
        name='token_verify'
    ),
    # BATCHES ##############################
    # DONE
    path(
        route='all_batches/',
        view=GeneralBatch1.as_view(),
        name='general_batches'
    ),
    path(
        route='all_batches/<int:pk>/',
        view=DeleteBatch.as_view(),
        name='general_batches'
    ),
    # TEXTS ################################
    path(
        route='all_texts/',
        view=GeneralText.as_view(),
        name='general_texts'
    ),
    path(
        route='all_texts/<int:pk>/',
        view=DeleteText.as_view(),
        name='general_texts'
    ),
    # ANALYSIS HISTORY #####################
    path(
        route='all_analyses/',
        view=AnalysisHistoryView.as_view(),
        name='general_texts'
    ),
    # ANALYSE THINGS ########################
    path(
        route='analysis_batch/<int:pk>/',
        view=AnalyzeBatch.as_view(),
        name='general_texts'
    ),
    path(
        route='analysis_text/<int:pk>/',
        view=AnalyzeText.as_view(),
        name='general_texts'
    ),
    path(
        route='delete_account/<int:pk>/',
        view=DeleteAccountView.as_view(),
        name='general_texts'
    ),


    # REGISTRATION #########################
    path(
        route='registration/',
        view=RegistrationView().as_view(),
        name='registration',
    ),
    path(
        route='registration/validation/',
        view=RegistrationValidationView.as_view(),
        name='registration_validation'
    ),

    path(
        route='reset_password/',
        view=ForgottenPasswordView.as_view(),
        name='reset_password'
    )

]
