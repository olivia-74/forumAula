import React, { useContext, useEffect, useState } from 'react';
import { ButtonCard, CardPost, CardStyle, ContainerCard, ContainerCardHome, ContainerPerfil, ConteudoCard, EditPost, ImgCard, ImgPost, MensagemCard, NomeCard, PerfilUsuario, TituloCard } from './style';
import { getPostAll } from '../../services/requests';
import Comentar from '../Comentar/Comentar';
import { GlobalStateContect } from '../../GlobalState/GlobalStateContext';

function Card() {

  const [loading, setLoading] = useState(true)
  const [forumTopics, setForumTopics] = useState([])

    const {selectedPostId} = useContext(GlobalStateContect)
    
    useEffect(() =>{
      getPostAll(setForumTopics)
    }, [])


  return (
    <>
    <ContainerCardHome>
        {
          loading ?(<ContainerCard> {forumTopics && forumTopics.map(dado =>{
            return(
              <CardStyle key={dado.post.id}>
                <PerfilUsuario>
                  {/* <ImgCard src={dado.imagem}/> */}
                  <ImgCard src="https://img.freepik.com/fotos-gratis/o-gato-vermelho-ou-branco-eu-no-estudio-branco_155003-13189.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1697932800&semt=ais"/>
                  <ContainerPerfil>
                    <NomeCard>
                      {dado.creator_username}
                      <MensagemCard>{dado.post_created_at}</MensagemCard>
                    </NomeCard>
                  </ContainerPerfil>
                </PerfilUsuario>
                <TituloCard>{dado.post_title}</TituloCard>
                <CardPost>
                  <ImgPost src={dado.post_image} alt ='foto post'/>
                  <ConteudoCard>{dado.post_content}</ConteudoCard>
                </CardPost>
                <EditPost>
                  <Comentar
                    postId = {dado.post_id}
                    comments = {dado.comments}
                    autorId = {dado.created_id}
                  />
                </EditPost>
              </CardStyle>
            )
          })}</ContainerCard>
          ):(<p>Loading</p>)
        }


    </ContainerCardHome>
     
  
    </>
  )
}

export default Card