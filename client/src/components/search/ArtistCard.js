import styled from "styled-components";

const ArtistCard = ({artist, imageSrc}) => {
    return (
        <Container>
          <CoverArt src={imageSrc} alt="album-cover" />
          <Info>
              <ArtistName>
                <p>{artist}</p>
              </ArtistName>
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
    
    const ArtistName = styled.span`
      display: flex;
      justify-content: center;
      width: 100%;
      max-width: 150px;
      p {
        font-size: 16px;
        font-weight: bold;
      }
    `;
    const CoverArt = styled.img`
      width: 150px;
      height: 150px;
      border-radius: 50%;
    `;
    const Container = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 10px;
    `;
    export default ArtistCard;