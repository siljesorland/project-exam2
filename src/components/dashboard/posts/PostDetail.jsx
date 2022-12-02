import React from 'react';
import { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../../../constants/api";
import AuthContext from '../../../context/AuthContext';
import { useParams } from "react-router-dom";

export default function GetPost() {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [auth] = useContext(AuthContext);

    let { id } = useParams();
    const getUrl = BASE_URL + `/social/posts/${id}?_author=true&_comments=true&_reactions=true`;


    useEffect(function () {
        async function GetPost() {
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            };
            try {
                const response = await fetch(getUrl, options);
                const json = await response.json();
                console.log(json);
                setPost(json);
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        }
        GetPost();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>ERROR: An error occured</div>;
    }

   

    return (
        <ul className="posts">
			<h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>Created at: {post.created}</p>
            <img src={post.media} alt=""  className="responsive"></img>
            <p>Author: {post.author.name}</p>
            <p>Comments:{post._count.comments}</p>
            <p>Reactions: {post._count.reactions}</p>
            <div>
        
      </div>
		</ul>
    );
}
