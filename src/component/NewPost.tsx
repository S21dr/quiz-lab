import React, {useState} from 'react';
import {Modal, Button, Input} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {getAuthorized, getModalNewPost} from "./select";
import {actionsAuth} from "../store/auth-reducer";
import {actionsLStorage, IPost} from "../store/lStorage";

const {TextArea} = Input;

const NewPost: React.FC = () => {
    const dispatch = useDispatch()
    const isModalVisible = useSelector(getModalNewPost)
    const [textArea, setTextArea] = useState('')
    const onChangeTextArea = (e:any) =>{
        setTextArea(e.target.value)
    }
    const handleCancel = () => {
        dispatch(actionsAuth.setModalNewPost(false))
    }
    const authUser = useSelector(getAuthorized)
    const addPost = () => {
        let content = textArea.trim()
        if (authUser && content.length) {
            const newPost: IPost = {
                name: authUser.name,
                content,
                likeId: [],
                parentId: authUser.id
            }
            let lSPosts = localStorage.getItem('posts');
            localStorage.setItem('posts',JSON.stringify(lSPosts?[...JSON.parse(lSPosts),newPost]:[newPost]) );
            dispatch(actionsLStorage.setPost(newPost))
            dispatch(actionsAuth.setModalNewPost(false))
        }
    }
    return (
        <Modal title="Basic Modal" visible={isModalVisible} onOk={addPost} okText={'Создать пост'}
               onCancel={handleCancel}>
            <h2>Новый пост</h2>
            <p>Введите новый пост:</p>
            <TextArea rows={4} value={textArea} onChange={onChangeTextArea}/>
        </Modal>
    );
}

export default NewPost;