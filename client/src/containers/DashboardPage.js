import React, { Component } from 'react'; 
import { NewStudentForm, OutsideDeactivator, StudentCard, Navbar} from '../components'
import { getStudents, deleteStudent, getStudentPendingList, updateLists } from '../helpers/api';
import { Icon } from 'semantic-ui-react'
import '../assets/dashboard.css'
class DashboardPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      studentForm: false,
      students: []
    }
  }

  openStudentForm = async event => {
    this.setState({studentForm: true})
  }

  deactivatedForm = event => {
    this.setState({studentForm: false});
  }

  deleteStudent = async id => {
    try {
      await deleteStudent(this.props.auth, id);
      let newStudentsArray = this.state.students.filter((student) => {
        return student._id !== id;
      })
      this.setState({students: newStudentsArray})
    } catch(err) {
      throw err;
    }
  }

  addStudent = async student => {
    try {
      let pendingLists = await getStudentPendingList(this.props.auth, student._id);
      if(pendingLists.data.length > 0) {
        student.pending = true;
      }
      let newArray = this.state.students;
      newArray.push(student);
      this.setState({students: newArray});
    } catch (err) {
      console.log(err.message);
    }
  }

  async componentDidMount(){
    try {
      let students = await getStudents(this.props.auth);
      let lists = await updateLists(this.props.auth);
      console.log(lists);
      students = students.data;
      await Promise.all(students.map(async (student) => {
        let pendingLists = await getStudentPendingList(this.props.auth, student._id);
        if(pendingLists.data.length > 0) {
            student.pending = true;
        }
        return student;
      }));
      this.setState({students:students});
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    let addStudentForm = this.state.studentForm ? <OutsideDeactivator component={NewStudentForm} callback={this.deactivatedForm.bind(this)} addStudent={this.addStudent.bind(this)} auth={this.props.auth}/> : null;
    let studentsCards = this.state.students.map((student) => {
      return <StudentCard key={student._id} deleteStudent={this.deleteStudent.bind(this)} student={student}/>
    })
    return (
      <div className="container column centered">
          <Navbar user={this.props.user}/>
          <div className="container column centered">
              <div className="container column centered" id="dashboard_container">
                <h1 id="dashboard_students_title">STUDENTS</h1>
                <Icon onClick={this.openStudentForm} id="dashboard_user_icon" name="add user"/>
                <div id="dashboard_hr"></div>
                {addStudentForm}
              </div>
          </div>
          <div className="container column">
            {studentsCards}
          </div>
      </div>
    );
  }
}

export default DashboardPage;
