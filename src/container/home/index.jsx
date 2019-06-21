import React from 'react';
import {Route, withRouter} from 'react-router';
import { connect } from 'react-redux';
//component
import CandidateContainer from './candidate';
import ApplicationContainer from './application';
//style
import styleHome from '../../css/home.css';
//Util
import * as parseUrlParameter from "../../Lib/parseUrlParameter";
class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            candidateId: 0,
            name: '',
            isHome: true,
        };
        this.handleUrl = this.handleUrl.bind(this);
    }
    componentWillMount() {
        this.handleUrl(this.props)
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.handleUrl(nextProps);
            return true;
        }
        if(this.props.location.search !== nextProps.location.search) {
            this.handleUrl(nextProps);
            return true;
        }
        if (nextState !== this.state) {
            return true;
        }

        return false;
    }
    handleUrl(curProps) {
        let urlParams = parseUrlParameter.parse(curProps.location.search);
        let url = curProps.location.pathname;
        if( url === '/'
        ) {
            this.setState({
                candidateId: 0,
                name: '',
                isHome: true,
            });
        } else if(url === '/application') {
            this.setState({
                candidateId: urlParams.id,
                name:  urlParams.name,
                isHome: false,
            });
        }
    }
    render() {

        return(
            <div className={styleHome.homeContainer}>
                {this.state.isHome ? null : <h1 onClick={() => this.props.history.push('/')}>HOME</h1>}
                <CandidateContainer candidateId={this.state.candidateId} name={this.state.name} />
                <Route path={'/application'} exact={false} strict={false} component={ApplicationContainer} />
            </div>
        )
    }
}
export default connect((state) => {
    return {
        home: state.data.home,
    };
})(withRouter(HomeContainer));