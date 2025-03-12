# Generated by Django 5.0.12 on 2025-03-11 11:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('django_comments_xtd', '0008_auto_20200920_2037'),
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('xtdcomment_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='django_comments_xtd.xtdcomment')),
                ('title', models.CharField(blank=True, max_length=200, null=True)),
                ('media', models.ImageField(max_length=300, upload_to='comments_media')),
                ('link', models.URLField(blank=True, max_length=500, null=True)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profile_comments', to='profiles.profile')),
            ],
            options={
                'verbose_name': 'Comment',
                'verbose_name_plural': 'Comments',
                'db_table_comment': 'LxnkUp comment model which inherits from django-comments-xtd',
            },
            bases=('django_comments_xtd.xtdcomment',),
        ),
    ]
