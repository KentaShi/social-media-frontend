import { Add, Remove } from "@material-ui/icons";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Users } from "../../data"
import Online from "../online/Online"
import "./rightbar.scss"

export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

    //console.log(user);
    useEffect(() => {
        setFollowed(currentUser.followings.includes(user?._id));
    }, [currentUser, user]);

    useEffect(() => {
        const getFriends = async () => {
            try {
                if (user._id) {
                    const friendList = await axios.get("/users/friends/" + user._id);
                    setFriends(friendList.data);
                }

            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
        console.log(friends);
    }, [user]);


    const handleFollow = async () => {
        try {
            if (followed) {
                await axios.put("/users/" + user._id + "/unfollow", { userId: currentUser._id });
                dispatch({ type: "UNFOLLOW", payload: user._id });
            } else {
                await axios.put("/users/" + user._id + "/follow", { userId: currentUser._id });
                dispatch({ type: "FOLLOW", payload: user._id });
            }

        } catch (err) {
            console.log(err);
        }
        setFollowed(!followed);
    }

    const HomeRightbar = () => {
        return (
            <>
                <img src={PF + "ads.jpg"} alt="" className="rightbarAds" />
                <hr className="rightbarHr" />
                <div className="birthdayContainer">
                    <img src={PF + "gift.png"} alt="" className="birthdayImg" />
                    <span className="birthdayText">
                        <b>Hoang Nam</b> and <b>3 other friends</b> have a birthday today.
                    </span>
                </div>
                <hr className="rightbarHr" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendsList">
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        )
    }
    const ProFileRightbar = () => {
        return (
            <>
                {user.username !== currentUser.username && (
                    <button className="rightbarButtonFollow" onClick={handleFollow} >
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove /> : <Add />}
                    </button>
                )}
                <h4 className="rightbarTitle">Infomation</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Gender</span>
                        <span className="rightbarInfoValue">{user.gender}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "--"}</span>
                    </div>
                </div>
                <hr className="rightbarHr" />
                {user.username === currentUser.username && (
                    <>
                        <h4 className="rightbarTitle">Friends</h4>
                        <div className="rightbarFollowings">
                            {friends.map((f) => (
                                <Link key={f._id} to={"/profile/" + f.username} style={{ textDecoration: "none" }} >
                                    <div className="rightbarFollowing">
                                        <img src={f.profilePicture ? PF + f.profilePicture : PF + "person/noAva.jpg"} alt="" className="rightbarFollowingImg" />
                                        <span className="rightbarFollowingUsername">{f.username}</span>
                                    </div>
                                </Link>
                            ))}

                        </div>
                    </>
                )}

            </>
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProFileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    )
}
