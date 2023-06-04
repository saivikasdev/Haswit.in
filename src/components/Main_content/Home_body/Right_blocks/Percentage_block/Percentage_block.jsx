import React, { useState } from 'react'
import './Percentage_block.css'
const Percentage_block = () => {
  
  const currentDate = new Date();
  const currentDay_ = currentDate.getDate();
const [month, setmonth] = useState(currentDate.getMonth());
  return (
    <div className="Percentage_block">
        <div className="column_percentage">
        <div className="Percentage_completed">
        Training completed
        </div>
        <div className="Out_of">
          Out of 100%
        </div>
        </div>
        <div className="Percentage">
        {Math.round(((currentDay_*(month-4))/80)*100)}%
        
        </div>
    </div>
  )
}

export default Percentage_block