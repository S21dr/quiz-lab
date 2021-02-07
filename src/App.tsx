import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import MainLayout from "./component/MainLayout";
import News from "./component/News";

const App: React.FC = () => {
    useEffect(()=>{
        console.log(localStorage)
    },[])
    return (
        <MainLayout>
            <News/>
        </MainLayout>
    );
}

export default App;
