import styled from "styled-components";

const ArtistCard = ({singers}) => {
  console.log(singers);
  let results = singers.slice(0, -15);
  return (
        <Container> 
          {
            results.map((singer) => {
              return (
                <div>
                  <img src={singer.images[0]?.url} alt="artist profile pic"/>
                  <h1>{singer.name}</h1>
                </div>
              )
            })
          }
        </Container>
      );
    };
    const Container = styled.div`
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: fit-content;
      gap: 150px;
      min-width: 450px;
      max-width: 100%;
      img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
      }

      h1 {
        color: black;
        font-size: 20px;
      }
    `;
    export default ArtistCard;