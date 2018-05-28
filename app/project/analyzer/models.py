from django.conf import settings
from django.db import models
from django.db.models import SET_NULL

from project.analyzer.helper_functions import code_generator


class UserProfile(models.Model):

    user = models.OneToOneField(
        verbose_name='user',
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='user_profile',
        null=True,
    )

    first_name = models.CharField(
        verbose_name='first_name',
        max_length=40,
    )

    last_name = models.CharField(
        verbose_name='last_name',
        max_length=40,
    )

    email = models.CharField(
        verbose_name='email',
        max_length=100,
    )

    registration_code = models.CharField(
        verbose_name='registration_code',
        max_length=15,
        unique=True,
        default=code_generator,
        blank=True
    )

    profile_picture = models.ImageField(
        verbose_name='profile_picture',
        upload_to='../profile_pictures/',
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = 'UserProfile'
        verbose_name_plural = 'UserProfiles'

    def __str__(self):
        return self.first_name + ' ' + self.last_name


class Text(models.Model):

    title = models.TextField(
        verbose_name='title',
    )

    user = models.ForeignKey(
        verbose_name='user',
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
    )

    created = models.DateField(
        verbose_name='created',
        auto_now_add=True,
        blank=True,
        null=True,
    )

    date_modified = models.DateField(
        verbose_name='date_modified',
        blank=True,
        null=True
    )

    content = models.TextField(
        verbose_name='content'
    )

    author = models.TextField(
        verbose_name='author',
        blank=True,
        null=True,

    )

    word_count = models.IntegerField(
        verbose_name='word_count',
        blank=True,
        null=True,
    )

    unique_words = models.IntegerField(
        verbose_name='unique_words',
        blank=True,
        null=True,
    )

    dale_chall = models.CharField(
        verbose_name='dale-chall',
        max_length=6,
        blank=True,
        null=True,
    )

    word_unique_word_ratio = models.TextField(
        verbose_name='word_unique_word_ratio',
        blank=True,
        null=True,
    )

    class Meta:
        unique_together = [
            ('author', 'title')
        ]

    def __str__(self):
        return self.title


class Batch(models.Model):

    name = models.TextField(
        verbose_name='name',
    )

    user = models.ForeignKey(
        verbose_name='user',
        to=settings.AUTH_USER_MODEL,
        on_delete=SET_NULL,
        related_name='posts',
        null=True,
    )

    created = models.DateField(
        verbose_name='created',
        auto_now_add=True,
    )

    date_modified = models.DateField(
        verbose_name='date_modified',
        null=True,
    )

    text_files = models.ManyToManyField(
        verbose_name='different_text_files',
        to=Text,
    )

    author = models.TextField(
        verbose_name='author',
        null=True,
        blank=True,
    )

    word_count = models.IntegerField(
        verbose_name='word_count',
        null=True,
        blank=True,
    )

    unique_words = models.IntegerField(
        verbose_name='unique_words',
        null=True,
        blank=True,
    )

    dale_chall = models.CharField(
        verbose_name='dale-chall',
        null=True,
        blank=True,
        max_length=5
    )

    word_unique_word_ratio = models.TextField(
        verbose_name='word_unique_word_ratio',
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = 'Batch'
        verbose_name_plural = 'Batches'

    def __str__(self):
        return self.name


ANALYSIS_TYPE = (
    ('Text', 'Text'),
    ('Batch', 'Batch '),
)


class AnalysisHistory(models.Model):

    user = models.ForeignKey(
        verbose_name='user',
        to=settings.AUTH_USER_MODEL,
        on_delete=SET_NULL,
        null=True,
    )

    type = models.CharField(
        verbose_name='type',
        max_length=40,
        choices=ANALYSIS_TYPE,
    )

    title = models.CharField(
        verbose_name='title',
        max_length=40,
    )

    created = models.DateField(
        verbose_name='created',
        auto_now_add=True,
    )

    text_files = models.ManyToManyField(
        verbose_name='text',
        to=Text,
        related_name='histories',
        blank=True
    )

    author = models.TextField(
        verbose_name='author',
        blank=True,
        null=True,
    )

    total_word_count = models.IntegerField(
        verbose_name='total_word_count',
        blank=True,
        null=True,
    )

    dale_chall_score = models.CharField(
        verbose_name='readability_batch',
        max_length=5,
        blank=True,
        null=True,
    )

    unique_words = models.IntegerField(
        verbose_name='unique_words_batch',
        blank=True,
        null=True,
    )

    word_frequency = models.CharField(
        # This must be a dictonary type field
        verbose_name='word_frequency_batch',
        max_length=6,
        blank=True,
        null=True,
    )

    word_unique_word_ratio = models.TextField(
        verbose_name='word_unique_word_ratio',
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = 'Analysis History'
        verbose_name_plural = 'Analysis Histories'
        ordering = ['-created']

    def __str__(self):
        return self.title
