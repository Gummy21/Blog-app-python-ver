# Generated by Django 3.0.6 on 2020-06-07 03:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0009_blog_auth_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='auth_name',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blog_user', to='blog.User', to_field='username'),
        ),
        migrations.AlterField(
            model_name='blog',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blog.User'),
        ),
    ]