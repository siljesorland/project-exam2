import React from 'react';
import { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../../../constants/api";
import AuthContext from '../../../context/AuthContext';
import { Link } from "react-router-dom";

const getUrl = BASE_URL + "/social/posts/?_author=true&_comments=true&_reactions=true";

export default function PostsList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [auth] = useContext(AuthContext);


    useEffect(function () {
        async function GetPosts() {
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
                setPosts(json);
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        }
        GetPosts();
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
            {posts.map((post) => {
                return (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <img src={post.media} alt="" className="responsive"></img>
                        <p>Comments:{post._count.comments}</p>
                        <p>Reactions:{post._count.reactions}</p>
                        <Link to={`/dashboard/posts/${post.id}`} className="">
                            Read the whole post
                        </Link>
                    </li>
                );
            })}
        </ul>
       
    );
}