# API ROUTES

## AUTHENTICATION ROUTES:

```HTTP POST /api/register``` 

#### REQUEST BODY:

| key  | value  |
| ---  |  ---   |
| username  |  user's CIn login. Only valid if it's a teacher assistant login. |
| password |  user's registered password. |

POST /api/login
Takes a username and a password, a logs the user, returns an authentication token.

GET /api/confirm/:token
Given an token (normally sent by email upon registration), confirms the user registration.

GET /api/cancel/:token
Given an token (normally sent by email upon registration), cancels the user registration.

GET /api/me
Returns the logged in user basic informations.
STUDENT ROUTES:

GET /api/me/students
Returns the current user students.

POST /api/me/students
Creates a student for the current user.

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
