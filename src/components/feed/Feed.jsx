import { useEffect } from "react";
import { useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.scss";
import axios from "axios"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


export default function Feed({ username, home }) {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);


    useEffect(() => {
        async function fetchData() {
            const res = username ? await axios.get(`/posts/profile/${username}`) : await axios.get("posts/timeline/" + user._id);
            setPosts(
                res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        }
        fetchData();
    }, [username, user._id])

    return (
        <div className="feed">
            <div className="feedWrapper">
                {home ? <Share /> : username === user.username ? <Share /> : ""}
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}


            </div>
        </div>
    )
}
