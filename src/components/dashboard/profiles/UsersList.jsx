import React from 'react';
//import useAxios from "../../../hooks/useAxios"
import { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../../../constants/api";
import AuthContext from '../../../context/AuthContext';
import { Link } from "react-router-dom";

const getUrl = BASE_URL + "/social/profiles";


export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [auth] = useContext(AuthContext);


    useEffect(function () {
        async function GetUsers() {
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
        GetUsers();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>ERROR: An error occured</div>;
    }



    return (
        <ul className="users">
            {users.map((user) => {
                return (
                    <li key={user.name}>
                        <h2>Name: {user.name}</h2>
                       <p>E-mail: {user.email}</p>
                        <img src={user.banner} alt="" className="responsive"></img>
                        <img src={user.avatar} alt="" className="responsive"></img>
                        <Link to={`/dashboard/profiles/${user.name}`} className="">
                            Visit Profile
                        </Link>
                    </li>
                );
            })}
        </ul>

    );
}