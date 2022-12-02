import React from 'react';
import { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../../../constants/api";
import AuthContext from '../../../context/AuthContext';
import { useParams } from "react-router-dom";

export default function GetUser() {
    const [user, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [auth] = useContext(AuthContext);

    let { name } = useParams();
    const getUrl = BASE_URL + `/social/profiles/${name}?_following=true&_followers=true`;


    useEffect(function () {
        async function GetUser() {
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
                setUsers(json);
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        }
        GetUser();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>ERROR: An error occured</div>;
    }



    return (

        <ul className="userDetail">
            <p>Name:</p>
            <h2>{user.name}</h2>
            <p>E-mail:</p>
            <p>{user.email}</p>
            <img src={user.banner} alt="" className="responsive"></img>
                        <img src={user.avatar} alt="" className="responsive"></img>
        </ul>
    );
}