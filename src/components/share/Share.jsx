import "./share.scss";
import { Cancel, EmojiEmotions, InsertPhoto, Label, LocationOn } from "@material-ui/icons"
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import axios from "axios";

export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const desc = useRef();
    const [file, setFile] = useState(null);
    console.log("len day");



    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);

            newPost.img = filename;
            console.log(newPost);
            try {
                await axios.post("/upload", data);
            } catch (err) {

            }

        }
        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAva.jpg"} alt="" className="shareProfileImg" />
                    <input placeholder={"What's in your mind " + user.username + " ?"} type="text" className="shareInput" ref={desc} />
                </div>
                <hr className="shareHr" />
                {console.log(file)}
                <div className="shareImgContainer">
                    {file && (
                        <>
                            <img src={URL.createObjectURL(file)} alt="" />
                            <Cancel className="shareCancel" onClick={() => setFile(null)} />
                        </>
                    )}
                </div>
                <form className="shareBottom" onSubmit={handleSubmit} >
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <InsertPhoto htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or video</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpg,.jpeg"
                                onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <LocationOn htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>

            </div>
        </div>
    )
}
