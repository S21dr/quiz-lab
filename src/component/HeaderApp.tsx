import React, {useState} from 'react';
import {UserOutlined} from '@ant-design/icons';
import {Button, Input, Modal} from "antd";
import s from "../style/header.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {getAuthorized, getModalLogin, getUsers} from "./select";
import {actionsAuth} from "../store/auth-reducer";
import {actionsLStorage, IUser} from "../store/lStorage";

const HeaderApp: React.FC = () => {
    const dispatch = useDispatch()
    const isModalVisible = useSelector(getModalLogin)
    const authorized = useSelector(getAuthorized)
    const users = useSelector(getUsers)
    const handleCancel = () => {
        dispatch(actionsAuth.setModalLogin(false))
    }
    const openModal = () => {
        dispatch(actionsAuth.setModalLogin(true))
    }

    const [input, setInput] = useState('')
    const changeInput = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        let str = e.target.value as string
        str = str.trim()
        setInput(str)
    }
    const login = ()=>{
        const user:IUser={
            id:Date.now().toString(),
            name:input,
            sub:[],
            followers:[]
        }
        if (!users){
            let newUsers = [user]
            localStorage.setItem('users',JSON.stringify(newUsers) );
            dispatch(actionsLStorage.setUser(newUsers))
            localStorage.setItem('authorized',JSON.stringify(user) );
            dispatch(actionsLStorage.setAuthorized(user))

        }else {
            let item =  users.find(el=>el.name == input)
            if (!item){
                localStorage.setItem('users',JSON.stringify([...users,user]) );
                dispatch(actionsLStorage.setUser([...users,user]))
                localStorage.setItem('authorized',JSON.stringify(user) );
                dispatch(actionsLStorage.setAuthorized(user))

            }else {
                localStorage.setItem('authorized',JSON.stringify(item) );
                dispatch(actionsLStorage.setAuthorized(item))

            }
        }
        setInput('')
        dispatch(actionsAuth.setModalLogin(false))
    }
    const logout = () =>{
        localStorage.setItem('authorized',JSON.stringify({}) );
        dispatch(actionsLStorage.setAuthorized(null ))
    }
    return (
        <header className={s.header}>
            <div>
                <UserOutlined/>
                {
                    authorized?
                        <>
                            <span>{authorized.name}</span>
                            <Button onClick={logout}  type={"text"}>Выйти</Button>
                        </>
                        :<>
                            <Button onClick={openModal} type={"text"}>Войти</Button>
                        </>
                }


            </div>
            <Modal visible={isModalVisible} onCancel={handleCancel} footer={false}>
                <h2>Введите имя:</h2>
                <Input placeholder={'Имя'} className={s.input} value={input} onChange={changeInput} onPressEnter={login}/>
                <Button onClick={login}   disabled={input.length<3} type={'primary'}>Продолжить</Button>
            </Modal>
        </header>
    );
}

export default HeaderApp;