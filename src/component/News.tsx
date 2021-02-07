import React from 'react';
import {Button, Tabs} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {getAuthorized, getPosts} from "./select";
import Post from "./Post";
import {actionsAuth} from "../store/auth-reducer";
import NewPost from "./NewPost";

const {TabPane} = Tabs;

const News: React.FC = () => {
    const dispatch = useDispatch()
    const authorized = useSelector(getAuthorized)
    const openNewPost = () =>{
        dispatch(actionsAuth.setModalNewPost(true))
    }
    const posts = useSelector(getPosts)

    return (
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Все посты" key="1">
                    {posts.map((el,i)=><Post key={i} {...el} />)}
                </TabPane>
                <TabPane tab="Подписки" key="2" disabled={!authorized}>
                    Content of Tab Pane 2
                </TabPane>
            </Tabs>
            {
                authorized?<Button onClick={openNewPost}>Содать пост</Button>:''
            }
            <NewPost/>
        </div>
    );
}

export default News;