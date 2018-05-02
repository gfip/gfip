import React, { Component } from 'react'; 
import { NewStudentForm, OutsideDeactivator, StudentCard, Navbar} from '../components'
import { getStudents } from '../helpers/api';
import { Icon } from 'semantic-ui-react'
import '../assets/dashboard.css'
class DashboardPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      addStudentForm: false,
      students: []
    }
  }

  openStudentForm = async event => {
      this.setState({addStudentForm: true})
  }

  deactivatedForm = event => {
    this.setState({addStudentForm: false});
  }

  addStudent = async student => {
    this.state.students.push(student);
  }

  async componentDidMount(){
    try {
      let students = await getStudents(this.props.auth);
      this.setState({students: students.data});
    } catch (err) {
      console.log(err.response.data);
    }
  }

  render() {
    let addStudentForm = this.state.addStudentForm ? <OutsideDeactivator component={NewStudentForm} callback={this.deactivatedForm} addStudent={this.addStudent} auth={this.props.auth}/> : null;
    let studentsCards = this.state.students.map((student) => {
      return <StudentCard key={student._id} student={student}/>
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
          <div>
            {studentsCards}
          </div>
      </div>
    );
  }
}

export default DashboardPage;
