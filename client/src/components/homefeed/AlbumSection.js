import styled from "styled-components";

const AlbumSection = ({albums}) => {
  console.log(albums);
  let firstResult = albums[0];
  let otherSongs = albums.slice(0, -15);

  //for timne duration of the song
  const formatDuration = (duration_ms) => {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Container>
      <FirstResult>
        <CoverArt src={firstResult.album.images[0]?.url} alt="album-cover" />
        <div>
          <h1>{firstResult.album.name}</h1>
          <p>{firstResult.album.artists[0].name}</p>
        </div>
      </FirstResult>
      <Results>
        {otherSongs.map((album) => {
          return (
            <Album key={album.album.id}>
              <img src={album.album.images[0]?.url} />
              <div>
                <TitleNTime>
                  <h1>{album.album.name}</h1>
                  <p>{album.album.release_date}</p>
                </TitleNTime>
                <p>{album.album.artists[0].name}</p>
              </div>
            </Album>
          );
        })}
      </Results>
    </Container>
  );
};

const TitleNTime = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  h1 {
    max-width: 200px;
  }
`;

const FirstResult = styled.div`
  display: flex;
  flex-direction: column;
  div {
    margin-top: 10px;
    max-width:320px;
  }
  h1 {
    font-size: 18px;
    color: black;
    text-align: left;
  }

  p {
    padding: 0px;
  }
`;

const Album = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  div {
    width: 100%;
  }

  h1 {
    font-size: 16px;
    color: black;
    text-align: left;
  }

  p {
    font-size: 14px;
    color: black;
    text-align: left;
  }
`;

const CoverArt = styled.img`
  margin-top: 15px;
  width: 320px;

  &:hover {
    cursor: pointer;
  }
`;

const Results = styled.div`
  padding: 15px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 480px;

  img {
    height: 45px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  height: 400px;
  width: 800px;
`;
export default AlbumSection;