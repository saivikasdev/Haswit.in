import React from 'react'
import './History_card.css'
import { UisFavorite } from '@iconscout/react-unicons-solid';
const History_card = (props) => {
  const {History_block} = props;
  return (
    <div className="History_card">
        <div className="history_row">
        <div className="Points_scored">
          {History_block.Points}
          
          <UisFavorite size="20px"/>
        </div>
          <div className="on_what">
          {History_block.Source}
          </div>
          <div className="date">
          {History_block.Time}
          </div>
        </div>


        <hr class="solid"/>

    </div>
  )
}

export default History_card