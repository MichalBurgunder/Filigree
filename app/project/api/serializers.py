import random

from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.core.mail import EmailMessage
from rest_framework import serializers

from project.analyzer.models import Batch, Text, AnalysisHistory, UserProfile
from project.api.analysis_formulas.class_structure_word_analysis import FullAnalysis


class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Batch
        fields = ['id', 'name', 'user', 'author', 'created', 'date_modified',
                  'text_files', 'word_count', 'unique_words', 'dale_chall', 'word_unique_word_ratio',
                  ]
        read_only_fields = ['user', 'created', 'date_modified']

    def create(self, validated_data):
        text_files = validated_data.pop('text_files')
        batch = Batch.objects.create(
            **validated_data,
            user=self.context.get('request').user
        )
        batch.text_files.set(text_files)
        return batch


class TextSerializer(serializers.ModelSerializer):

    class Meta:
        model = Text
        fields = ['id', 'title', 'user', 'created', 'date_modified',
                  'content', 'author', 'dale_chall',
                  'word_count', 'unique_words', 'word_unique_word_ratio']

    def create(self, validated_data):
        text = Text.objects.create(
            **validated_data,
            user=self.context.get('request').user
        )
        return text


class AnalysisSerializer(serializers.ModelSerializer):

    class Meta:
        model = AnalysisHistory
        fields = ['id', 'type', 'title', 'user', 'created', 'author',
                  'total_word_count', 'dale_chall_score',
                  'unique_words', 'word_unique_word_ratio'
                  ]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


# Registration serializers


class RegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField(
        label='Registration E-Mail Address'
    )

    def validate_email(self, email):
        try:
            User.objects.get(email=email)
            raise serializers.ValidationError('User already exist!')
        except User.DoesNotExist:
            return email

    @staticmethod
    def send_registration_email(email, code):
        message = EmailMessage(
            subject='Filigree registration',
            body=f'Hi there!\n\nThank you for signing up for Filigree!\n '
                 f'Here is your code:  \n\n{code}\n\nHappy analyzing!\n\nMichal <3',
            to=[email],
        )
        message.send()

    def save(self, validated_data):
        email = validated_data.get('email')
        new_user = User.objects.create_user(
            username=email,
            email=email,
            is_active=False,
        )
        profile = UserProfile.objects.create(
            user=new_user,
            first_name='first_name_placeholder',
            last_name='last_name_placeholder',
            registration_code=self.code_generator(),
        )
        self.send_registration_email(
            email=email,
            code=profile.registration_code,
        )
        return new_user

    def code_generator(self):
        return random.randint(10000, 99999)


User = get_user_model()


class RegistrationValidationSerializer(RegistrationSerializer):
    class Meta:
        model = UserProfile
        fields = ['code', 'password', 'password_repeat', 'email', 'first_name',
                  'last_name']

    code = serializers.CharField(
        label='Validation code',
        write_only=True,
    )
    password = serializers.CharField(
        label='Password',
        write_only=True,
    )
    password_repeat = serializers.CharField(
        label='Repeat Password',
        write_only=True,
    )
    first_name = serializers.CharField(
        label='First name'
    )
    last_name = serializers.CharField(
        label='Last name'
    )

    def validate_email(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError('User does not exist!')

    def validate(self, data):
        user = data.get('email')
        if data.get('password') != data.get('password_repeat'):
            raise serializers.ValidationError({
                'password_repeat': 'Passwords do not match!'
            })
        if data.get('code') != user.user_profile.registration_code or user.is_active:
            raise serializers.ValidationError({
                'code': 'Wrong validation code or already validated!'
            })
        return data

    def save(self, validated_data):
        user = validated_data.get('email')

        user.first_name = validated_data.get('first_name')
        user.last_name = validated_data.get('last_name')

        user.user_profile.first_name = validated_data.get('first_name')
        user.user_profile.last_name = validated_data.get('last_name')

        user.is_active = True
        user.set_password(validated_data.get('password'))
        user.save()
        user.user_profile.save()
        return user


class ForgottenPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(
        label='Registration E-Mail Address'
    )

    def validate_email(self, email):
        try:
            User.objects.get(email=email)
            raise serializers.ValidationError('User already exist!')
        except User.DoesNotExist:
            return email

    @staticmethod
    def send_registration_email(email, code):
        message = EmailMessage(
            subject='Filigree registration',
            body=f'Hi there!\n\nThank you for signing up for Filigree!\n '
                 f'Here is your code:  \n\n{code}\n\nHappy analyzing!\n\nMichal <3',
            to=[email],
        )
        message.send()

    def save(self, validated_data):
        email = validated_data.get('email')
        new_user = User.objects.create_user(
            username=email,
            email=email,
            is_active=False,
        )
        profile = UserProfile.objects.create(
            user=new_user,
        )
        self.send_registration_email(
            email=email,
            code=profile.registration_code,
        )
        return new_user


class QuickAnalyzeSerializer(serializers.Serializer):
    content = serializers.CharField(label='content', write_only=True)
    word_count = serializers.IntegerField(read_only=True)
    unique_words = serializers.IntegerField(read_only=True)
    dale_chall_analysis = serializers.FloatField(read_only=True)

    def analyze(self, validated_data):
        quick_analysis = FullAnalysis(validated_data.get('content'))
        return {
            'word_count': quick_analysis.word_count(),
            'unique_words': quick_analysis.unique_words(),
            'dale_chall_analysis': quick_analysis.dale_chall_analysis(),
        }
