import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.scss";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        async function fetchUser() {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        }
        fetchUser();
    }, [username])

    return (
        <>
            <Topbar />
            <div className="profileContainer">
                <Sidebar />
                <div className="profile">
                    <div className="profileTop">
                        <div className="profileCover">
                            <img src={user.coverPicutre ? PF + user.coverPicutre : PF + "person/noCover.jpg"} alt="" className="profileImgCover" />
                            <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAva.png"} alt="" className="profileImgAvatar" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileBottom">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>

            </div>

        </>
    )
}
