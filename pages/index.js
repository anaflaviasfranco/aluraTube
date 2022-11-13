import config from "../config.json"
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";

function HomePage() {
    const estilosHomePage = { backgroundColor: "red" };
    return (
       <>
        <CSSReset/>
        <div style={estilosHomePage}>
            <Menu />
            <Header />
            <Timeline playlists={config.playlists} />
        </div>

        </>
    );
}

export default HomePage



const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
function Header() {
    return (
        <div>
            <StyledHeader>
                <section className="user-info">
                    {/* <img src="banner" /> */}
                    <img src={`https://github.com/${config.github}.png`} />
                    <div>
                        <h2>{config.name} </h2>
                        <p>{config.job}</p>
                    </div>
                </section>
            </StyledHeader>
        </div>
    )
}


function Timeline(props) {
    const playlistsNames = Object.keys(props.playlists);
    //statement (for normal)
    //retorno por expressao (map)
    return (
        <div>
            {playlistsNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                return videos.map((video) => {
                    return (
                        <section>
                            <h2>{playlistName}</h2>
                            <div>
                                <a href={video.url}>
                                    <img src={video.thumb} />
                                    <span>
                                        {video.title}
                                    </span>
                                </a>
                            </div>
                        </section>
                    )
                });
            })}
        </div>
    )
}