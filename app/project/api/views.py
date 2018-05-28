from django.contrib.auth.models import User
from rest_framework.generics import GenericAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from project.analyzer.models import Batch, Text, AnalysisHistory
from project.api.analysis_formulas.class_structure_word_analysis import FullAnalysis
from project.api.serializers import BatchSerializer, TextSerializer, AnalysisSerializer, \
    RegistrationValidationSerializer, RegistrationSerializer, ForgottenPasswordSerializer, QuickAnalyzeSerializer, \
    UserSerializer
from project.exceptions import TextDoesNotExist


class GeneralBatch2(ListCreateAPIView):
    serializer_class = BatchSerializer
    queryset = Batch.objects.all()
    permission_classes = [
        IsAuthenticated,
    ]

    def filter_queryset(self, queryset):
        queryset = queryset.filter(user=self.request.user)
        return queryset


class GeneralBatch1(GenericAPIView):
    serializer_class = BatchSerializer
    queryset = Batch.objects.all()
    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request):
        batches = Batch.objects.filter(user=request.user)
        return Response(BatchSerializer(batches, many=True).data)

    def post(self, request):
        # print(request.data)
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        print(serializer.validated_data)
        serializer.save()
        return Response(serializer.data)


class DeleteBatch(GenericAPIView):
    serializer_class = BatchSerializer
    queryset = Batch.objects.all()

    def delete(self, request, **kwargs):
        try:
            batch = self.get_object()
        except ():
            return Response('Error! Batch cannot be found.')
        batch.delete()
        return Response('Batch deleted')


class GeneralText(GenericAPIView):
    serializer_class = TextSerializer
    queryset = Text.objects.all()
    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request):
        texts = Text.objects.filter(user=request.user)
        return Response(TextSerializer(texts, many=True).data)

    def post(self, request):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class DeleteText(GenericAPIView):
    serializer_class = TextSerializer
    queryset = Text.objects.all()
    permission_classes = [
        IsAuthenticated,
    ]

    def delete(self, request, pk):
        try:
            text_delete = Text.objects.get(id=pk)
        except TextDoesNotExist:
            return Response('No item to be deleted!')
        text_delete.delete()
        return Response('Item deleted.')


class AnalyzeBatch(GenericAPIView):
    serializer_class = BatchSerializer
    queryset = Batch.objects.all()
    permission_classes = [
        IsAuthenticated,
    ]

    def post(self, request, **kwargs):
        batch = self.get_object()
        combined_texts = ''
        print(batch.text_files)
        for file in batch.text_files.all():
            combined_texts += file.content + ' '
        batch_full_analysis = FullAnalysis(combined_texts)
        batch_full_analysis.dale_chall_pullwords()
        batch.word_count = batch_full_analysis.word_count()
        batch.unique_words = batch_full_analysis.unique_words()
        batch.dale_chall = batch_full_analysis.dale_chall_analysis()
        batch.word_unique_word_ratio = batch.unique_words/batch.word_count
        batch.save()

        entry = AnalysisHistory.objects.create(
            user=request.user,
            type='Batch',
            title=batch.name,
            author=batch.author,
            created=batch.created,
            total_word_count=batch.word_count,
            dale_chall_score=batch.dale_chall,
            unique_words=batch.unique_words,
            word_unique_word_ratio=batch.unique_words/batch.word_count,
        )
        entry.save()
        return Response('Batch analyzed!')


class AnalyzeThis(GenericAPIView):
    serializer_class = QuickAnalyzeSerializer
    permission_classes = []

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.analyze(serializer.validated_data)
        return Response(self.serializer_class(data).data)


class AnalyzeText(GenericAPIView):
    serializer_class = TextSerializer
    queryset = Text.objects.all()
    permission_classes = [
        IsAuthenticated,
    ]

    def post(self, request, **kwargs):
        text = self.get_object()
        content = text.content
        text_full_analysis = FullAnalysis(content)
        text_full_analysis.dale_chall_pullwords()
        text.word_count = text_full_analysis.word_count()
        text.unique_words = text_full_analysis.unique_words()
        text.dale_chall = text_full_analysis.dale_chall_analysis()
        text.word_unique_word_ratio = text.unique_words / text.word_count
        text.save()

        entry = AnalysisHistory.objects.create(
            user=request.user,
            type='Text',
            title=text.title,
            author=text.author,
            created=text.created,
            total_word_count=text.word_count,
            dale_chall_score=text.dale_chall,
            unique_words=text.unique_words,
            word_unique_word_ratio=text.unique_words/text.word_count,
        )
        entry.save()
        return Response("Text Analyzed!")


class AnalysisHistoryView(GenericAPIView):
    serializer_class = AnalysisSerializer
    queryset = AnalysisHistory.objects.all().order_by('-created')
    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request):
        analyses = AnalysisHistory.objects.filter()
        return Response(AnalysisSerializer(analyses, many=True).data)


class DeleteAccountView(GenericAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [
        IsAuthenticated,
    ]

    def delete(self, request, pk):
        try:
            user = User.objects.get(id=pk)
        except User.DoesNotExist:
            return Response('No item to be deleted!')
        user.delete()
        return Response("User deleted!")

# REGISTRATION STUFF #####################################


class RegistrationView(GenericAPIView):
    permission_classes = []
    serializer_class = RegistrationSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(serializer.validated_data)
        return Response('Email sent!')


class RegistrationValidationView(GenericAPIView):
    permission_classes = []
    serializer_class = RegistrationValidationSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save(serializer.validated_data)

        return Response(self.get_serializer(user).data)


# FORGOTTEN PASSWORD #######################################


class ResetUserView(GenericAPIView):
    permission_classes = []
    serializer_class = ForgottenPasswordSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(serializer.validated_data)
        return Response(serializer.data)


class ForgottenPasswordView(GenericAPIView):
    permission_classes = []
    serializer_class = ForgottenPasswordSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(serializer.validated_data)
        return Response(serializer.data)
