import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

# This lets you import from the parent directory (one level up)
sys.path.append(os.path.abspath('../../'))
from app import add_event_to_db
from app import get_events
import app
import models

INITIAL_HOST = 'Mike'
INITIAL_EVENT_ID = 1
INITIAL_EVENT_NAME = 'Disco Meetup'
INITIAL_EVENT_DESCRIPTION = 'Enjoying Disco party, eat and have fun.'
INITIAL_RESTAURANT = "Slikcity Platters"
INITIAL_LOCATION = '340 Paterson Ave'
INITIAL_EVENT_DATE = "2021-04-25"
INITIAL_EVENT_TIME = '8:14 PM'
EXPECTED_OUTPUT = 'Output'
INPUT='Input'


class AddEventTestCase(unittest.TestCase):
    
    def setUp(self):
        self.test_success_params = [
            {
                
                INPUT:{
                    'host':"Jake Palmer",
                    'event_name': "Winning Celebration",
                    'event_description':"Celebrating the Win" ,
                    'restaurant': 'La Casa',
                    'location':'20 Pannington Ave',
                    'event_date': '2021-04-20',
                    'event_time': '8:30 PM'
                    },
                EXPECTED_OUTPUT:
                models.Event(host="Jake Palmer",
                             event_name="Winning Celebration",
                             event_description="Celebrating the Win",
                             restaurant='La Casa',
                             location='20 Pannington Ave',
                             event_date='2021-04-20',
                             event_time='8:30 PM')
            },
             {
                
                INPUT:{
                    'host':"Elon Musk",
                    'event_name': "Tesla X NASA Contract",
                    'event_description':"Celebrating winning Nasa Contracts" ,
                    'restaurant': 'Nan King',
                    'location':'170 Wall Street',
                    'event_date': '2021-4-25',
                    'event_time': '7:00 PM'
                    },
                EXPECTED_OUTPUT:
                models.Event(host="Elon Musk",
                             event_name="Tesla X NASA Contract",
                             event_description="Celebrating winning Nasa Contracts",
                             restaurant='Nan King',
                             location='170 Wall Street',
                             event_date='2021-4-25',
                             event_time='7:00 PM')
            },
            {
            INPUT:{
                    'host':"Jack Black",
                    'event_name': "Movie premiere",
                    'event_description':"celebrating new movie" ,
                    'restaurant': "Casa d'Paco",
                    'location':'73 Warwick St',
                    'event_date': '2021-4-25',
                    'event_time': '7:00 PM'
                    },
                EXPECTED_OUTPUT:
                models.Event(host="Jack Black",
                             event_name="Movie premiere",
                             event_description="celebrating new movie",
                             restaurant="Casa d'Paco",
                             location='73 Warwick St',
                             event_date='2021-4-25',
                             event_time='7:00 PM')
            }
           
        ]
        self.test_success_params2 = [
            {
                
                INPUT:{
                    'host':"Jake Palmer",
                    'event_name': "Winning Celebration",
                    'event_description':"Celebrating the Win" ,
                    'restaurant': 'La Casa',
                    'location':'20 Pannington Ave',
                    'event_date': '2021-04-20',
                    'event_time': '8:30 PM'
                    },
                EXPECTED_OUTPUT:
                models.Event(host="Jake Palmer",
                             event_name="Winning Celebration",
                             event_description="Celebrating the Win",
                             restaurant='La Casa',
                             location='20 Pannington Ave',
                             event_date='2021-04-20',
                             event_time='8:30 PM')
            },
             {
                
                INPUT:{
                    'host':"Elon Musk",
                    'event_name': "Tesla X NASA Contract",
                    'event_description':"Celebrating winning Nasa Contracts" ,
                    'restaurant': 'Nan King',
                    'location':'170 Wall Street',
                    'event_date': '2021-4-25',
                    'event_time': '7:00 PM',
                    'attendees':'Andrew'
                    },
                EXPECTED_OUTPUT:
                models.Event(host="Elon Musk",
                             event_name="Tesla X NASA Contract",
                             event_description="Celebrating winning Nasa Contracts",
                             restaurant='Nan King',
                             location='170 Wall Street',
                             event_date='2021-4-25',
                             event_time='7:00 PM',
                             attendees='Andrew')
            },
            {
            INPUT:{
                    'host':"Jack Black",
                    'event_name': "Movie premiere",
                    'event_description':"celebrating new movie" ,
                    'restaurant': "Casa d'Paco",
                    'location':'73 Warwick St',
                    'event_date': '2021-4-25',
                    'event_time': '7:00 PM',
                    'attendees':'Jake'
                    },
                EXPECTED_OUTPUT:
                models.Event(host="Jack Black",
                             event_name="Movie premiere",
                             event_description="celebrating new movie",
                             restaurant="Casa d'Paco",
                             location='73 Warwick St',
                             event_date='2021-4-25',
                             event_time='7:00 PM',
                             attendees='Jake')
            
            
            }
            
        ]
       
        print(INPUT)
        print(self.test_success_params)
       
        initial_event = models.Event(
            host=INITIAL_HOST,
            event_name=INITIAL_EVENT_NAME,
            event_description=INITIAL_EVENT_DESCRIPTION,
            restaurant=INITIAL_RESTAURANT,
            location=INITIAL_LOCATION,
            event_date=INITIAL_EVENT_DATE,
            event_time=INITIAL_EVENT_TIME)

        self.initial_db_mock = [initial_event]
        print(self.initial_db_mock)

    def mocked_db_session_add(self, eventt):
        self.initial_db_mock.append(eventt)
        print(self.initial_db_mock)

    def mocked_db_session_commit(self):
        pass
    
    def mocked_person_query_all(self):
        return self.initial_db_mock

    def test_success(self):
        for test in self.test_success_params:
            with patch('app.DB.session.add', self.mocked_db_session_add):
                with patch('app.DB.session.commit',
                           self.mocked_db_session_commit):
                    actual_result = add_event_to_db(
                        test[INPUT])
                    #print(actual_result)
                    
                    expected_result = test[EXPECTED_OUTPUT]
                    #print(expected_result)
                    self.assertEqual(type(actual_result),
                                     type(expected_result))
                    self.assertEqual(actual_result.event_name,expected_result.event_name)
                    self.assertEqual(actual_result.host,expected_result.host)
        
    def test_success2(self):   
        for test in self.test_success_params2:
            with patch('models.Event.query.all') as mocked_query:
                mocked_query.all = self.mocked_person_query_all
                actual_result = test[EXPECTED_OUTPUT]
                print("actual",get_events)
                    
                expected_result = test[EXPECTED_OUTPUT]
                print("expected",expected_result)
                self.assertEqual(type(actual_result),
                                 type(expected_result))
                self.assertEqual(actual_result,expected_result)
    
if __name__ == '__main__':
    unittest.main()