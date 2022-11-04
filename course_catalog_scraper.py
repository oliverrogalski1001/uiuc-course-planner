from bs4 import BeautifulSoup
from requests import request
import json
from time import sleep

YEAR = "2023"
SEMESTER = "spring"
COURSE_URL = f"https://courses.illinois.edu/schedule/{YEAR}/{SEMESTER}"
CISAPP_URL = f"https://courses.illinois.edu/cisapp/explorer/schedule/{YEAR}/{SEMESTER}"
page = request("get", CISAPP_URL + ".xml")
soup = BeautifulSoup(page.content, features="xml")

data = {}

for subject in soup.subjects.children:
    subject_url = subject["href"]
    subject_code = subject["id"]
    subject_page = request("get", subject_url)
    subject_soup = BeautifulSoup(subject_page.content, features="xml")
    course_list = []

    print(subject_code)

    for course in subject_soup.courses.children:
        course_number = course["id"]
        course_title = course.text

        course_page = request("get", f"{CISAPP_URL}/{subject_code}/{course_number}" + ".xml")
        course_soup = BeautifulSoup(course_page.content, features="xml")

        course_hours = course_soup.creditHours.text
        course_explorer_url = f"{COURSE_URL}/{subject_code}/{course_number}"

        course_list.append({"number": course_number,
                            "title": course.text,
                            "hours": course_hours,
                            "explorerURL": course_explorer_url
                            })
        sleep(0.5)

    data[subject_code] = course_list
    sleep(0.5)


with open(f"frontend/src/{SEMESTER}{YEAR}.json", "w") as outfile:
    json.dump(data, outfile, indent=4, sort_keys=False)

