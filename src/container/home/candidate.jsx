import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as homeAction from '../../Data/Home/action';
import ApplicationComponent from './application';
//style
import styleHome from '../../css/home.css';
import * as parseUrlParameter from "../../Lib/parseUrlParameter";
class CandidateContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            candidatesList : [],
            candidateId: 0,
            name: '',
        };
        this.getCandidateList = this.getCandidateList.bind(this);
        this.getInfo = this.getInfo.bind(this);
    }
    componentWillMount() {
        let urlParams = parseUrlParameter.parse(this.props.location.search);
        this.setState({
            candidateId: this.props.candidateId || urlParams.id,
            name: this.props.name || urlParams.name,
        }, () => {
            this.getCandidateList();
        });

    }
    getCandidateList() {
        let params = {};
        this.props.dispatch(homeAction.getCandidateList(params))
            .then(response => {
                this.setState({
                    candidatesList: response.candidate
                });
            }).catch(error => {
            this.setState({
                candidatesList: [],
            }, () => {
                console.log(error);
            });
        });
    }

    getInfo(id, name) {
        this.setState({
            candidateId: id,
            name: name,
        }, () => {
            this.props.history.push('/application?id=' + id + '&name=' + name);
        });
    }
    render() {
        let renderCandidatesList = this.state.candidatesList && this.state.candidatesList.length > 0 ? this.state.candidatesList.map((data, index) => {
            return(
                <li key={index} className={styleHome.list + ' ' + ((this.state.name === data.name) && (this.props.location.pathname !== '/')  ? styleHome.active : '')} onClick={() => this.getInfo(data.applicationId ? data.applicationId : 0, data.name)}>{data.name}</li>
            )
        }) : <div>Sorry, this information is not available.</div> ;

        return(
            <div className={styleHome.candidateContainer}>
                <h1>Candidate List</h1>
                <ul>
                    {renderCandidatesList}
                </ul>
            </div>
        )
    }
}
export default connect((state) => {
    return {
        home: state.data.home,
    };
})(withRouter(CandidateContainer));