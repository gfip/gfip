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
---
```HTTP
POST /api/me/reset
``` 

#### REQUEST BODY

| key  | value  |
| ---  |  ---   |
| username  |  user's CIn login|

#### RESPONSE
If successful send email to user and returns:
```HTTP
200 OK
"Reset password email sent to your @cin.ufpe.br email"
```

---
```HTTP
PUT /api/me/reset/:token
``` 

#### REQUEST BODY

| key  | value  |
| ---  |  ---   |
| newPassword |  user's new password|

#### RESPONSE
If successful send email to user and returns:
```HTTP
200 OK
"Changed password for (username)"
```

---
```HTTP
PUT /api/me
``` 

#### REQUEST BODY

| key  | value  |
| ---  |  ---   |
| oldPassword |  user's current password|
| newPassword |  user's new password|

#### RESPONSE
If successful send email to user and returns:
```HTTP
200 OK
"Password Successfully changed"
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
---
```HTTP
POST /api/me/students
```
#### HEADERS
| key | value |
| --- | ---   |
| Authorization | Bearer authorization token |

#### RESPONSE
If successful:
```JSON
{
	"name": "Student's name",
	"username": "Student's CIn login",
	"theHuxleyId": "Id from the huxley app",
	"_id": "Student's database id"
}
```
---

```HTTP
DELETE /api/me/students/:student_id
```
#### HEADERS
| key | value |
| --- | ---   |
| Authorization | Bearer authorization token |

#### RESPONSE
If successful:
```JSON
{
	"name": "Deleted Student's name",
	"username": "Deleted Student's login",
	"theHuxleyId": "Deleted Student's the huxley app id",
	"reports": "List of the deleted student reports database ids"
}
```
---
```HTTP
GET /api/me/students/:student_id
```
#### HEADERS
| key | value |
| --- | ---   |
| Authorization | Bearer authorization token |

#### RESPONSE
If successful:
```JSON
{
	"name": "Student's name",
	"username": "Student's login",
	"theHuxleyId": "Student's the huxley app id",
	"reports": "Student's reports database ids"
}
```
---

```HTTP
PUT /api/me/students/:student_id
```
#### HEADERS
| key | value |
| --- | ---   |
| Authorization | Bearer authorization token |

#### REQUEST BODY
| key  | value  |
| ---  |  ---   |
| name  |  students's new name. **Required**. |
| login |  students's new login. **Required**. |

#### RESPONSE
If successful:
```JSON
{
	"name": "Student's name",
	"username": "Student's login",
	"theHuxleyId": "Student's the huxley app id",
	"reports": "Student's reports database ids"
}
```
---
```HTTP
GET /api/me/students/:student_id/lists
```
#### HEADERS
| key | value |
| --- | ---   |
| Authorization | Bearer authorization token |

#### RESPONSE
If successful:
```JSON
{
	"pendingLists": "An array with de information of the lists that doesnt have reports registered on this student" 
}
```
---
```HTTP
GET /api/me/students/:student_id/lists/:list_id
```
#### HEADERS
| key | value |
| --- | ---   |
| Authorization | Bearer authorization token |

#### RESPONSE
If successful:
```JSON
{
	"list": "An object with the list's information and the to each problem code submitted to it" 
}
```
---

## REPORT ROUTES:

```HTTP
GET /api/me/students/:student_id/reports
```
#### HEADERS
| key | value |
| --- | ---   |
| Authorization | Bearer authorization token |

#### RESPONSE
If successful:
```JSON
{
	"report": "An array with the user reports" 
}
```
---

```HTTP
POST /api/me/students/:student_id/reports
```
#### HEADERS
| key | value |
| --- | ---   |
| Authorization | Bearer authorization token |

#### REQUEST BODY
| key  | value  |
| ---  |  ---   |
| comments |  an array of comments on the problems of the report. |
| finalComment | a final comment on the report. |

#### RESPONSE
If successful sends it by email do the student and returns:
```JSON
{
	createdReport: " All the report's information",
}
```
---

```HTTP
POST /api/me/students/:student_id/reports
```
#### HEADERS
| key | value |
| --- | ---   |
| Authorization | Bearer authorization token |

#### REQUEST BODY
| key  | value  |
| ---  |  ---   |
| comments |  an array of comments on the problems of the report. |
| finalComment | a final comment on the report. |

#### RESPONSE
If successful sends it by email do the student and returns:
```JSON
{
	createdReport: " All the report's information",
}
```
---
```HTTP
DELETE /api/me/students/:student_id/reports/:report_id
```
#### HEADERS
| key | value |
| --- | ---   |
| Authorization | Bearer authorization token |

#### RESPONSE
If successful:
```JSON
{
	deletedReport: " All the report's information",
}
```
---

```HTTP
GET /api/me/students/:student_id/reports/:report_id
```
#### HEADERS
| key | value |
| --- | ---   |
| Authorization | Bearer authorization token |

#### RESPONSE
If successful:
```JSON
{
	foundReport: " All the report's information",
}
```
