import { Bookmark, Chat, Event, Gamepad, Group, GroupTwoTone, QuestionAnswer, RssFeed, School, Store, Tv, WatchLater, Work } from "@material-ui/icons";
import "./sidebar.scss";

import { Users } from "../../data";
import CloseFriend from "../closeFriend/CloseFriend";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Group className="sidebarListItemIcon" />
                        <span className="sidebarListItemText">Friend</span>
                    </li>
                    <li className="sidebarListItem">
                        <GroupTwoTone className="sidebarListItemIcon" />
                        <span className="sidebarListItemText">Group</span>
                    </li>
                    <li className="sidebarListItem">
                        <Tv className="sidebarListItemIcon" />
                        <span className="sidebarListItemText">Watch</span>
                    </li>
                    <li className="sidebarListItem">
                        <Store className="sidebarListItemIcon" />
                        <span className="sidebarListItemText">Marketplace</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className="sidebarListItemIcon" />
                        <span className="sidebarListItemText">Bookmark</span>
                    </li>
                    <li className="sidebarListItem">
                        <WatchLater className="sidebarListItemIcon" />
                        <span className="sidebarListItemText">Memories</span>
                    </li>
                    <li className="sidebarListItem">
                        <Gamepad className="sidebarListItemIcon" />
                        <span className="sidebarListItemText">Game</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarListItemIcon" />
                        <span className="sidebarListItemText">Event</span>
                    </li>
                    <li className="sidebarListItem">
                        <School className="sidebarListItemIcon" />
                        <span className="sidebarListItemText">School</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show more</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    {Users.map((u) => (
                        <CloseFriend key={u.id} user={u} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;