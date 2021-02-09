import React, {useEffect} from 'react';
import {  Route, Switch, } from 'react-router-dom'
import './App.css';
import MainLayout from "./component/MainLayout";
import News from "./component/News";
import ProfileContainer from "./component/ProfileContainer";
import Followers from "./component/Followers";

const App: React.FC = () => {
    useEffect(()=>{
        console.log(localStorage)
    },[])
    return (
        <MainLayout>
            <Switch>
                <Route exact path='/'
                       render={() =>  <News/>}/>

                <Route path='/profile/:userId?'
                       render={() => <ProfileContainer/>}/>

                <Route path='/followers'
                       render={() => <Followers/> }/>

                <Route path='*'
                       render={() => <div>404 NOT FOUND</div>}/>
            </Switch>


        </MainLayout>
    );
}

export default App;
