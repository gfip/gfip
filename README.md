# API ROUTES

## AUTHENTICATION ROUTES

```HTTP
POST /api/register
``` 

#### REQUEST BODY

| key  | value  |
| ---  |  ---   |
| username  |  user's CIn login. Only valid if it's a teacher assistant login. **Required**. |
| password |  user's wanted password. **Required**. |

#### RESPONSE
If successful:
```HTTP
200 OK
"Successfully registered, please confirm your @cin.ufpe.br e-mail."
```

If not successful and its a custom error:
```HTTP
500 Internal Server Error
"Custom error message"
```
---

```HTTP
POST /api/login
``` 

#### REQUEST BODY

| key  | value  |
| ---  |  ---   |
| username  |  user's registered login. **Required**. |
| password |  user's registered password. **Required**. |

#### RESPONSE
If successful:
```JSON
{"token": "user token"}
```
If not successful and user didn't confirm e-mail:
```HTTP
401 Unauthorized
"User not confirmed"
```

If not successful and incorrect password/username:
```HTTP
401 Unauthorized
"Incorrect username or password"
```

If not successful and its a custom error:
```HTTP
500 Internal Server Error
"Custom error message"
```

---

```HTTP
GET /api/me
``` 
#### HEADERS
| key  | value  |
| ---  |  ---   |
| Authorization  |  Bearer authorization token |

#### RESPONSE
If successful:
```JSON
{
  "username": "user's username",
  "imageUrl": "user's image url"
}
```

If not successful and its a custom error:
```HTTP
500 Internal Server Error
"Custom error message"
```

---

## STUDENT ROUTES

```HTTP
GET /api/me/students
``` 
#### HEADERS
| key  | value  |
| ---  |  ---   |
| Authorization  |  Bearer authorization token |

#### RESPONSE
If successful:
```JSON
{
  "returnedStudents": "array of objects with name, username and The Huxley Id of user's registered students"
}
```

Example:
```JSON
{
  "returnedStudents": [{"name": "Example junior", "username": "ej","theHuxleyId": 123}, {"name": "Example Neto", "username": "en", "theHuxleyId": 555}]

}
```

If not successful and its a custom error:
```HTTP
500 Internal Server Error
"Custom error message"
```
---
```HTTP
POST /api/me/students
```
##HEADERS
| key | value |
| --- | ---   |
| Authorization | Bearer authorization token |

## RESPONSE
If successful:
```JSON
{
	"name": "Student's name",
	"username": "Student's CIn login",
	"theHuxleyId": "Id from the huxley app"
}
```
If not successful and its a custom error:
```HTTP
500 Internal Server Error
"Custom error message"
```

DELETE /api/me/students/:student_id
Deletes the student from the database.

GET /api/me/students/:student_id
Returns the information from the student.

PUT /api/me/students/:student_id
Updates the student information

GET /api/me/students/:student_id/lists
Returns the student pending lists information

GET /api/me/students/:student_id/lists/:list_id
Returns the student's list (with evaluation and code)
REPORT ROUTES:

GET /api/me/students/:student_id/reports
Returns the student's reports

POST /api/me/students/:student_id/reports
Create a report and sends it via email to the student

DELETE /api/me/students/:student_id/reports/:report_id
Deletes a report

GET /api/me/students/:student_id/reports/:report_id
Returns report information

PUT /api/me/students/:student_id/reports/:report_id
Update report information
