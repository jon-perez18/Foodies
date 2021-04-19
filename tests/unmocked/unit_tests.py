import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys
from yelp.client import Client
import requests

from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
MY_API_KEY = os.getenv('MY_API_KEY')
ENDPOINT='https://api.yelp.com/v3/businesses/search'
HEADERS = {'Authorization':'bearer %s' % MY_API_KEY}
# This lets you import from the parent directory (one level up)
sys.path.append(os.path.abspath('../../'))
from app import get_restaurant_recs

RECS_INPUT = "address"
EXPECTED_OUTPUT = "expected"

class UpdateUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                RECS_INPUT: {'addy': 'Newark', 'radio': '5000'},
                EXPECTED_OUTPUT: {"Casa d'Paco": '73 Warwick St', 'Tops Diner': '500 Passaic Ave', 'Sabor Unido': '77 Jefferson St', 'Fornos of Spain': '47 Ferry St', 'The Yard - Newark': '55 Park Pl'}
            },
            {
                RECS_INPUT: {'addy': 'San Diego', 'radio': '10000'},
                EXPECTED_OUTPUT: {'C Level': '880 Harbor Island Dr', 'Cross Street Chicken and Beer': '4403 Convoy St', 'CoCo Ichibanya': '4428 Convoy St', 'Homestyle Hawaiian': '7524 Mesa College Dr', 'North Italia': '7055 Friars Rd'}
            },
            {
                RECS_INPUT: {'addy': 'Princeton', 'radio': '39000'},
                EXPECTED_OUTPUT: {'The Meeting House': '277 Witherspoon St', 'Agricola Eatery': '11 Witherspoon St', 'Salt Creek Grille': '1 Rockingham Row', 'Blue Point Grill': '258 Nassau St', 'Roots Ocean Prime': '98 University Pl'}
            },
            
        ]
        # self.success_test_params2 = [
        #     {
        #         USERNAME_INPUT: 100,
        #         EXPECTED_OUTPUT: 99
        #     },
        #     {
        #         USERNAME_INPUT: 105,
        #         EXPECTED_OUTPUT: 104
        #     },
        #     {
        #         USERNAME_INPUT: 1,
        #         EXPECTED_OUTPUT: 0
        #     },
        # ]
        # self.success_test_params3 = [
        #     {
        #         USERNAME_INPUT: "anuja",
        #         EXPECTED_OUTPUT: models.Person(username="anuja", score=100)
        #     },
        #     {
        #         USERNAME_INPUT: "badeti",
        #         EXPECTED_OUTPUT: models.Person(username="badeti", score=100)
        #     },
        #     {
        #         USERNAME_INPUT: "",
        #         EXPECTED_OUTPUT: models.Person(username="", score=100)
        #     },
        # ]

    def test_recs(self):
        for test in self.success_test_params:
            # TODO: Make a call to add user with your test inputs
            # then assign it to a variable
            actual_result = get_restaurant_recs(test[RECS_INPUT])
            print("actual",actual_result)
            # Assign the expected output as a variable from test
            expected_result = test[EXPECTED_OUTPUT]
            print("expected",expected_result)
            # Use assert checks to see compare values of the results
            self.assertEqual(actual_result, expected_result)
            self.assertEqual(type(actual_result), type(expected_result))
    # def test_sub_loss(self):
    #     for test in self.success_test_params2:
    #         # TODO: Make a call to add user with your test inputs
    #         # then assign it to a variable
    #         actual_result = sub_loss(test[USERNAME_INPUT])
            
    #         # Assign the expected output as a variable from test
    #         expected_result = test[EXPECTED_OUTPUT]

    #         # Use assert checks to see compare values of the results
    #         self.assertEqual(actual_result, expected_result)
    #         self.assertEqual(type(actual_result), type(expected_result))
    # def test_new_user(self):
    #     for test in self.success_test_params3:
    #         # TODO: Make a call to add user with your test inputs
    #         # then assign it to a variable
    #         actual_result = new_user(test[USERNAME_INPUT])
    #         print()
    #         print(actual_result)
    #         # Assign the expected output as a variable from test
    #         expected_result=test[EXPECTED_OUTPUT]
    #         print(expected_result)
    #         # Use assert checks to see compare values of the results
    #         self.assertEqual(actual_result.username, expected_result.username)
    #         self.assertEqual(actual_result.score, expected_result.score)
    #         self.assertEqual(type(actual_result), type(expected_result))

if __name__ == '__main__':
    unittest.main()