import styled from "styled-components";

const SongCard = ({ name, artist, imageSrc, chooseSong }) => {
  let displayName = name;
  if (name.length > 40) {
    displayName = name.substr(0, 40) + "...";
  }
  return (
    <Container onClick={chooseSong}>
      <CoverArt src={imageSrc} alt="album-cover" />
      <Info>
          <ArtistName>
            <p>{artist}</p>
          </ArtistName>
          <SongName>
              <p>{displayName}</p>
          </SongName>
      </Info>
    </Container>
  );
};

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  justify-content: flex-start;
  width: 100%;
`

const SongName = styled.span`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  p {
    font-size: 14px
  }
`
const ArtistName = styled.span`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 5px;
  p {
    font-size: 12px;
    font-weight: bold;
  }
`;
const CoverArt = styled.img`
  width: 150px;
  height: 150px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;
export default SongCard;
