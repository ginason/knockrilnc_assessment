import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

//component
import RootViews from './container/Root';
//redux
import store from "./store";

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <Switch>
                        <Route path={'/'} exact={false} strict={true} component={RootViews} />
                    </Switch>
                </Provider>
            </BrowserRouter>
        );
    }
}

export default App;
