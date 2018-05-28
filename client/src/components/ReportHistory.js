import React, { Component } from 'react'; 

class ReportHistory extends Component {
    constructor(props){
        super(props);
        this.state = {
        
        }
    }

    render() {
        // let reports = orderBy(this.props.reports, ['endDate', 'title'], ['asc', 'asc']);
        //     reports = reports.map((report) => {
        //     return <HistoryCard report={report}/>
        // })

        return (
            <div className="container column">
                <h1 style={{"textAlign":"center"}} id="show_student_title">History</h1>
                <div id="show_student_hr"></div>
                {/* {reports} */}
                Under construction :)
            </div>
       )
    }
}

export default ReportHistory;
