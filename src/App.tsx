import React from 'react';
import './App.css';
import Card from "./common/Card";
import {Profileform, StepTypes} from "./pages/Profile/Profileform";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";


function App() {

    return (
        <Router>
            <Switch>
                <Route exact path={"/profile/:step"}>
                    <div className="App">
                        <div className={"App-wrapper"}>
                            <Card>
                                <Profileform />
                            </Card>
                        </div>
                    </div>
                </Route>
                <Redirect to={`/profile/${StepTypes.CREATE}`}/>
            </Switch>
        </Router>


    );
}

export default App;
