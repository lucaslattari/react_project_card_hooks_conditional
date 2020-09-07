import React, {useState} from 'react';
import './ChannelHandler.css';

const ChannelHandler = props => {

  /*
  * CSS
  *
  */
  const styleCard = {
    width: '100%',
  };

  const styleButton = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  }

  const styleButtonRed = {
      backgroundColor: '#f44336',
      border: 'none',
      color: 'white',
      padding: '15px 32px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
  }

  const styleButtonGreen = {
      backgroundColor: '#4CAF50',
      border: 'none',
      color: 'white',
      padding: '15px 32px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
  }

  /*
  *   VETOR CONTENDO CANAIS
  *
  */
  let channels_comp_yt = [
    { avatar: "avatarUD.png", name: "Universo Discreto", description: "Computação" },
    { avatar: "avatarPB.jpg", name: "Peixe Babel", description: "Computação" },
    { avatar: "avatarPD.jpg", name: "Programação Dinâmica", description: "Computação" },
  ]

  let channels_general_yt = [
    { avatar: "avatarLOH.jpg", name: "Leitura Obrigahistória", description: "História" },
    { avatar: "avatarMDM.jpg", name: "Manual do Mundo", description: "Tecnologia e Ciência" },
    { avatar: "avatarNV1C.jpg", name: "Nunca Vi 1 Cientista", description: "Ciência em Geral" },
  ]

  /*
  *   STATES INICIAIS
  *
  */
  const [channelsState, setChannelsState] = useState({
    channels: channels_comp_yt.concat(channels_general_yt),
    currentChannelId: 0,
    showDescription: true,
    filterComputingChannels: false,
  });

  const [channelState, setChannelState] = useState({
    avatar: channelsState.channels[0].avatar,
    name: channelsState.channels[0].name,
    description: channelsState.channels[0].description
  });


  /*
  *
  *   MÉTODOS AUXILIARES
  *
  */
  function generateChannelsArray(filterComputingChannels){
    if (filterComputingChannels === true){
      return channels_comp_yt;
    }else{
      return channels_comp_yt.concat(channels_general_yt);
    }
  }

  /*
  *   MÉTODOS COM FUNCIONALIDADES DA APLICAÇÃO COM QUEM O USUÁRIO INTERAGE DIRETAMENTE
  *
  */
  const changeChannel = (newName, newAvatar, newDescription) => {
    let currentChannelID = channelsState.currentChannelId + 1;
    if(currentChannelID >= channelsState.channels.length) {
      currentChannelID = 0;
    }

    //let channels_yt = channels_comp_yt.concat(channels_general_yt);
    let finalChannelsArray = generateChannelsArray(channelsState.filterComputingChannels);
    finalChannelsArray.concat({ avatar: newAvatar, name: newName, description: newDescription });

    setChannelsState({
      channels: finalChannelsArray,
      currentChannelId: currentChannelID,
      showDescription: channelsState.showDescription,
      filterComputingChannels: channelsState.filterComputingChannels,
    });

    console.log(currentChannelID)
    setChannelState({
      avatar: channelsState.channels[currentChannelID].avatar,
      name: channelsState.channels[currentChannelID].name,
      description: channelsState.channels[currentChannelID].description,
    });
  }

  const editChannelName = (event) => {
    console.log(event.target.value);
      setChannelState({
        avatar: 'avatarCUSTOM.png',
        name: event.target.value,
        description: "Indefinido",
        channelId: 1
      });
  }

  const toggleShowDescription = () => {
    let _showDescription;
    if (channelsState.showDescription === true){
      _showDescription = false;
    }else{
      _showDescription = true;
    }

    //console.log(_showDescription)

    setChannelsState({
      channels: channelsState.channels,
      currentChannelId: channelsState.currentChannelId,
      showDescription: _showDescription,
      filterComputingChannels: channelsState.filterComputingChannels,
    });
  }

  const showOnlyComputingChannels = (newName, newAvatar, newDescription) =>{
    let _filterComputingChannels;
    if (channelsState.filterComputingChannels === true){
      _filterComputingChannels = false;
    }else{
      _filterComputingChannels = true;
    }

    console.log(_filterComputingChannels)

    let finalChannelsArray = generateChannelsArray(_filterComputingChannels);
    finalChannelsArray.concat({ avatar: newAvatar, name: newName, description: newDescription });

    setChannelsState({
      channels: finalChannelsArray,
      currentChannelId: 0,
      showDescription: channelsState.showDescription,
      filterComputingChannels: _filterComputingChannels,
    });

    setChannelState({
      avatar: channelsState.channels[0].avatar,
      name: channelsState.channels[0].name,
      description: channelsState.channels[0].description,
    });
  }

  /*
  *    MUDAR VISUAL DO BOTÃO DE FILTRAR CANAIS QUANDO APERTADO
  *
  */
  let filterButtonStyle, filterButtonLabel;
  if (channelsState.filterComputingChannels === true){
    filterButtonStyle = styleButtonRed;
    filterButtonLabel = 'Não Filtrar Computação'
  }else{
    filterButtonStyle = styleButtonGreen;
    filterButtonLabel = 'Filtrar Computação'
  }

  /*
  *   O QUE É RENDERIZADO DE FATO!
  *
  */
  return(
    <div className="channelComponent">
      <div className="card">
        <img src={channelState.avatar} alt={`Avatar do canal ${channelState.name}`} style={styleCard}/>
        <div className="container">
          <h4><b>{channelState.name}</b></h4>
          {
            channelsState.showDescription === true ? <p>{channelState.description}</p> : null
          }
        </div>
        <button
          type="button"
          onClick={() => changeChannel(props.newName, props.newAvatar, props.newDescription)}
          style={styleButton}>
            Mudar Canal
        </button>
        <button
          type="button"
          onClick={() => toggleShowDescription()}
          style={styleButton}>
            Esconder Descrição
        </button>
        <button
          type="button"
          onClick={() => showOnlyComputingChannels(props.newName, props.newAvatar, props.newDescription)}
          style={filterButtonStyle}>
            {filterButtonLabel}
        </button>
      </div>

      <div className="form">
        <form>
          <label>
            Nome do Canal: <input type="text" onChange={editChannelName} />
          </label>
        </form>
      </div>
  </div>
  );
};

export default ChannelHandler;
