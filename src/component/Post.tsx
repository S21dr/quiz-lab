import React from 'react';
import {IPost} from "../store/lStorage";


const Post: React.FC<IPost> = (props) => {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>{props.content}</p>
            {
                props.likeId.length? <div>
                    <span>Понравилось:</span>
                </div>:''
            }

        </div>
    );
}

export default Post;