import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./home.scss"

const Home = () => {
    const isHome = true;
    return (
        <>
            <Topbar />
            <div className="home-container">
                <Sidebar />
                <Feed home={isHome} />
                <Rightbar />
            </div>

        </>
    );
}

export default Home;