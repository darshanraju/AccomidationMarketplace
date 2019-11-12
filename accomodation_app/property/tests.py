from django.test import TestCase
from .models import Property, Feature
from django.contrib.auth.models import User
import csv
import os

# Create your tests here.

'''
This class generates a bunch of propertys and loads them into the database for testing purposes. 
to run this function: 
	run the django manage.py shell
	type 'from property.tests import GenerateTestPropertys'
	then type 'GenerateTestPropertys.generate()'
the database should now be loaded with the new files. 

*** Important ****
It assumes that you have a user with user wih id 1 who will own the property, if you don't it will not work 

in the csv file property.csv are the base instances of the property's
there are all real addresses sourced from google maps and the following website
https://www.google.com.au/travel/hotels/New%20South%20Wales?g2lb=2502405%2C2502548%2C4208993%2C4254308%2C4258168%2C4260007%2C4270442%2C4274032%2C4285990%2C4288513%2C4289525%2C4291318%2C4296668%2C4301054%2C4305595%2C4308216%2C4311410%2C4313006%2C4315873%2C4317816%2C4317915%2C4318271%2C4319579%2C4324289%2C4329496%2C4270859%2C4284970%2C4291517%2C4292955%2C4316256&hl=en&gl=au&un=1&ap=SAEqKAoSCdx2xgH9aEHAEUh-j4MvtmFAEhIJakBfjU1LOMARSH6Pgz-lYkAwAlqNAQoFCKwCEAAiA0FVRCoWCgcI4w8QDBgBEgcI4w8QDBgCGAEoALABAFgBaAGKASgKEgn5GHoNw9RBwBHwnMorh6NhQBISCfWAFtDzOjnAEfCcyiuXkmJAmgEREg9OZXcgU291dGggV2FsZXOiARsKCC9tLzA1Zmx5Eg9OZXcgU291dGggV2FsZXOSAQIgAQ&q=hotels%20motels%20nsw&rp=EMSIt6rMru2FBBCWw-qr1NjplYwBEKvJq4_ZgqewExDqp5n9sb2aoZUBaAE4AUAASAI&ictx=1&ved=2ahUKEwjA1NKlruHlAhXRXisKHfA2BwMQtgN6BAgKEE0&hrf=CgUIrAIQACIDQVVEKhYKBwjjDxAMGAESBwjjDxAMGAIYASgAsAEAWAFoAYoBKAoSCdx2xgH9aEHAEUh-j4MvtmFAEhIJakBfjU1LOMARSH6Pgz-lYkCaARESD05ldyBTb3V0aCBXYWxlc6IBGwoIL20vMDVmbHkSD05ldyBTb3V0aCBXYWxlc5IBAiAB&tcfs=EjUKCC9tLzA1Zmx5Eg9OZXcgU291dGggV2FsZXMaGAoKMjAxOS0xMi0wMRIKMjAxOS0xMi0wMiIYCgoyMDE5LTEyLTAxEgoyMDE5LTEyLTAyUgA,
, though not nessasarily hotels or houses :\
this function will then generate more property by enumerating the house number on those addresses. 
it will generate 10 houses per house in the csv file. 
Note that if you run this program twise it will make multiple coppys of the same house in the database :(
'''
class GenerateTestPropertys:

	def generate():
		# open the csv file 
		module_dir = os.path.dirname(__file__)
		property_csv = os.path.join(module_dir, 'property.csv')
		# propertys for the testing gotten from google search and the link bellow 
		# https://www.google.com.au/travel/hotels/New%20South%20Wales?g2lb=2502405%2C2502548%2C4208993%2C4254308%2C4258168%2C4260007%2C4270442%2C4274032%2C4285990%2C4288513%2C4289525%2C4291318%2C4296668%2C4301054%2C4305595%2C4308216%2C4311410%2C4313006%2C4315873%2C4317816%2C4317915%2C4318271%2C4319579%2C4324289%2C4329496%2C4270859%2C4284970%2C4291517%2C4292955%2C4316256&hl=en&gl=au&un=1&ap=SAEqKAoSCdx2xgH9aEHAEUh-j4MvtmFAEhIJakBfjU1LOMARSH6Pgz-lYkAwAlqNAQoFCKwCEAAiA0FVRCoWCgcI4w8QDBgBEgcI4w8QDBgCGAEoALABAFgBaAGKASgKEgn5GHoNw9RBwBHwnMorh6NhQBISCfWAFtDzOjnAEfCcyiuXkmJAmgEREg9OZXcgU291dGggV2FsZXOiARsKCC9tLzA1Zmx5Eg9OZXcgU291dGggV2FsZXOSAQIgAQ&q=hotels%20motels%20nsw&rp=EMSIt6rMru2FBBCWw-qr1NjplYwBEKvJq4_ZgqewExDqp5n9sb2aoZUBaAE4AUAASAI&ictx=1&ved=2ahUKEwjA1NKlruHlAhXRXisKHfA2BwMQtgN6BAgKEE0&hrf=CgUIrAIQACIDQVVEKhYKBwjjDxAMGAESBwjjDxAMGAIYASgAsAEAWAFoAYoBKAoSCdx2xgH9aEHAEUh-j4MvtmFAEhIJakBfjU1LOMARSH6Pgz-lYkCaARESD05ldyBTb3V0aCBXYWxlc6IBGwoIL20vMDVmbHkSD05ldyBTb3V0aCBXYWxlc5IBAiAB&tcfs=EjUKCC9tLzA1Zmx5Eg9OZXcgU291dGggV2FsZXMaGAoKMjAxOS0xMi0wMRIKMjAxOS0xMi0wMiIYCgoyMDE5LTEyLTAxEgoyMDE5LTEyLTAyUgA,



		with open(property_csv, 'r') as csvfile:
			property_reader = csv.reader(csvfile, delimiter=',')
			# read each row
			for row in property_reader:
				# for each row 
				print(row[0], row[1], int(row[2])) #TODO save the file to the DB
				new_property = Property(owner_id=User.objects.get(id=1),
                                  address=row[0],
                                  suburb=row[1],
                                  postcode=int(row[2]),
                                  price=int(row[3]),
                                  no_guests=int(row[4]),
                                  no_beds=int(row[5]),
                                  no_bathrooms=int(row[6]));
				new_property.save()

				# generate 10 more addresses from 1
				splitAddress = row[0].split(' ');
				number = int(splitAddress[0])
				streetName = " ".join(splitAddress[1:])
				for i in range(1, 11):
					newAddress = str(number + i) + " " + streetName
					print(newAddress, row[1], row[2])
					new_property = Property(owner_id=User.objects.get(id=1),
                                  address=newAddress,
                                  suburb=row[1],
                                  postcode=int(row[2]),
                                  price=int(row[3]),
                                  no_guests=int(row[4]),
                                  no_beds=int(row[5]),
                                  no_bathrooms=int(row[6]));
					new_property.save()
			return "success"

	'''
	This function is for if you onaly want to add onlay the specified few files into the database.
	pass in the address of the file
	'''
	def generate_onaly(filename):
		#module_dir = os.path.dirname(__file__)
		#property_csv = os.path.join(module_dir, filename)
		with open(filename, 'r') as csvfile:
			property_reader = csv.reader(csvfile, delimiter=',')
			# read each row
			for row in property_reader:
				# for each row 
				print(row[0], row[1], int(row[2])) #TODO save the file to the DB
				new_property = Property(owner_id=User.objects.get(id=1),
                                  address=row[0],
                                  suburb=row[1],
                                  postcode=int(row[2]),
                                  price=int(row[3]),
                                  no_guests=int(row[4]),
                                  no_beds=int(row[5]),
                                  no_bathrooms=int(row[6]));
				new_property.save()
			return "success"

	# GenerateTestPropertys.generate_Feature()
	def generate_Feature():
		for i in range(1,43):
			if i < 20:
				new_feature = Feature(property_id=Property.objects.get(id=i), 
									name="Air Conditioner")
				new_feature.save()
			if i > 5 and i < 25:
				new_feature = Feature(property_id=Property.objects.get(id=i), 
									name="Wifi")
				new_feature.save()
			if i > 10 and i < 30:
				new_feature = Feature(property_id=Property.objects.get(id=i), 
									name="Heating")
				new_feature.save()
			if i > 15 and i < 35:
				new_feature = Feature(property_id=Property.objects.get(id=i), 
									name="Free Parking")
				new_feature.save()
			if i > 20 and i < 40:
				new_feature = Feature(property_id=Property.objects.get(id=i), 
									name="Pool")
				new_feature.save()
			if i == 40:
				new_feature = Feature(property_id=Property.objects.get(id=i), 
									name="Heating")
				new_feature.save()
			if i == 41:
				new_feature = Feature(property_id=Property.objects.get(id=i), 
									name="Free Parking")
				new_feature.save()



	def test():
		print("hello world");
