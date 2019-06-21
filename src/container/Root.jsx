import React, { Component } from 'react';
import {
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import HomeContainer from './home'

class RootView extends React.Component {
    componentDidMount() {
    }

    render() {
        return(
            <div>
                <Route path={'/'} exact={true} strict={false} component={HomeContainer} />
                <Route path={'/application'} exact={true} strict={false} component={HomeContainer} />
            </div>
        )
    }
}
export default connect((state) => {
    return {
        home: state.data.home
    };
})(withRouter(RootView));