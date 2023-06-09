
import './Tech_ID.css';
import { By_haswit } from './components/By_haswit/By_haswit';
import { Features } from './components/Features/Features';
import { Jobs_interships } from './components/Jobs_interships/Jobs_interships';
import { Mentor_opinions_price } from './components/Mentor_opinions_price/Mentor_opinions_price';
import { TID_join } from './components/TID_join/TID_join';
import { Topics } from './components/Topics/Topics';
import bg from './images/Background.png'
import { UilPhone } from '@iconscout/react-unicons'
import { useState } from 'react';
import { Link } from "react-router-dom";

import copy from "copy-to-clipboard";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Talk_to_us } from './components/Talk_to_us/Talk_to_us';
function Tech_ID() {
  const [number, setnumber] = useState(false)
  const copyToClipboard = () => {
    copy('+919182783270');
    alert(`You have copied "${'+919182783270'}"`);
  }
  return (
    <div className="Tech_ID" style={{ backgroundImage: `url(${bg})` }}>
      <TID_join />
      <Topics />
      <By_haswit />
      <Jobs_interships />
      <Mentor_opinions_price />
      <Features />
<Talk_to_us/>
<Link to='/cancellation-refund'>
<div className="Links">
cancellation-refund
</div>
</Link>
<Link to='/Privacy-policy'>
<div className="Links">
Privacy-policy
</div>
</Link>
<Link to='/Terms-conditions'>
<div className="Links">
Terms-conditions
</div>
</Link>
<Link to='/Contact'><div className="Links" >
Contact
</div>
</Link>
      <div className="FAB" onMouseOver={() => {
        setnumber(true)
      }}
        onMouseOut={() => {
          setnumber(false)
        }}
        onClick={copyToClipboard}>

        <UilPhone />
        {
          number === true ?
            (
              <>
                +919182783270
              </>
            ) :
            (
              <>
              </>
            )

        }
      </div>
    </div>
  );
}

export default Tech_ID;
