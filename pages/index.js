import React from 'react'
import config from '../config.json'
import Menu from '../src/components/Menu'
import Header from '../src/components/Header'
import Favorites from '../src/components/Favorites'
import { StyledTimeline } from '../src/components/Timeline'
import { videoService } from '../src/services/videoService'



function HomePage() {
    const service = videoService();
  const [valorDoFiltro, setValorDoFiltro] = React.useState('')

  const [playlists, setPlaylists] = React.useState({})

  React.useEffect(() => {
    service.getAllVideos()
    .then((dados) => {
        console.log(dados.data)
        //forma imutavel
        const novasPlaylists = { ...playlists }
        dados.data.forEach((video) => {
          if (!novasPlaylists[video.playlist]) {
            novasPlaylists[video.playlist] = []
          }
          novasPlaylists[video.playlist]?.push(video)
        })
        setPlaylists(novasPlaylists)
      })
  }, [])

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          // backgroundColor: "red",
        }}
      >
        <Menu
          valorDoFiltro={valorDoFiltro}
          setValorDoFiltro={setValorDoFiltro}
        />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>
          Conteúdo
        </Timeline>
        <Favorites profiles={config.favorites} />
      </div>
    </>
  )
}

export default HomePage

function Timeline({ searchValue, ...props }) {
  // console.log("Dentro do componente", props.playlists);
  const playlistNames = Object.keys(props.playlists)
  // Statement
  // Retorno por expressão
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playlists[playlistName]
        // console.log(playlistName);
        // console.log(videos);
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase()
                  const searchValueNormalized = searchValue.toLowerCase()

                  return titleNormalized.includes(searchValueNormalized)
                })
                .map((video) => {
                  return (
                    <a key={video.url} href={video.url}>
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                    </a>
                  )
                })}
            </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}
