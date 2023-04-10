import styled from "styled-components";

const AlbumCard = ({name, artist, imageSrc}) => {
    let displayName = name;
    if (name.length > 20) {
        displayName = name.slice(0, 40) + "...";
    }
    return (
        <Container>
          <CoverArt src={imageSrc} alt="album-cover" />
          <Info>
              <ArtistName>
                <p>{artist}</p>
              </ArtistName>
              <AlbumName>
                  <p>{displayName}</p>
              </AlbumName>
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
    
    const AlbumName = styled.span`
      display: flex;
      justify-content: flex-start;
      width: 100%;

      p {
        font-size: 14px;
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
export default AlbumCard;