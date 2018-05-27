import axios from 'axios';

export function me(token){
    return axios.get('/api/me', {
        headers: {
            Authorization: 'Bearer ' + token 
        }
    })
}

export function getStudents(token){
    return axios.get('/api/me/students', {
        headers: {
            Authorization: 'Bearer ' + token 
        }
    })
}

export function getStudentInfo(token, id){
    return axios.get(`/api/me/students/${id}`, {
        headers: {
            Authorization: 'Bearer ' + token 
        }
    })
}

export function getStudentPendingList(token, id){
    return axios.get(`/api/me/students/${id}/lists`, {
        headers: {
            Authorization: 'Bearer ' + token 
        }
    })
}

export function getStudentPendingReports(token, id, list_id){
    return axios.get(`/api/me/students/${id}/reports`, {
        headers: {
            Authorization: 'Bearer ' + token 
        }
    })
}

export function getListInfo(token, student_id, list_id){
    return axios.get(`/api/me/students/${student_id}/lists/${list_id}`, {
        headers: {
            Authorization: 'Bearer ' + token 
        }
    })
}

export function discardListReport(token, student_id, list_id){
    return axios.post(`/api/me/students/${student_id}/lists/${list_id}/reports/blank`, {}, {
        headers: {
            Authorization: 'Bearer ' + token 
        }
    })
}

export function updateLists(token){
    return axios.get(`/api/lists`, {
        headers: {
            Authorization: 'Bearer ' + token 
        }
    })
}

export function deleteStudent(token, id) {
    return axios.delete(`/api/me/students/${id}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

}
export function addStudent(token, username, name){
    return axios.post('/api/me/students', {name, username} ,{
        headers: {
            Authorization: 'Bearer ' + token 
        }
    })
}

export function register(auth){
    return axios.post('/api/register', {
        username: auth.username,
        password: auth.password
    })
}