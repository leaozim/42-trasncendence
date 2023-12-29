# Generated by Django 4.2.8 on 2023-12-29 19:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('srcs_chat', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='chat',
            name='blocked_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]