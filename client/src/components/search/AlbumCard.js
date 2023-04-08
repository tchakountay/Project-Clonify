import styled from "styled-components";

const AlbumCard = ({name, artist, imageSrc}) => {
    return (
        <Container>
          <CoverArt src={imageSrc} alt="album-cover" />
          <Info>
              <ArtistName>
                <p>{artist}</p>
              </ArtistName>
              <SongName>
                  <p>{name}</p>
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
export default AlbumCard;