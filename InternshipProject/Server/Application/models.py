from django.db import models

class Employee(models.Model):
	name = models.CharField(max_length=100)
	age = models.IntegerField(default="0")
	gender = models.CharField(max_length=50)
	address = models.CharField(max_length=100)
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Employee, self).save(*args, **kwargs)