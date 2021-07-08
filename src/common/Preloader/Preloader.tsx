import React from "react";
import preloader from '../../common/img/1476.gif';

const Preloader = React.memo(() => {
  return (
    <div>
      <img src={preloader} alt="preloader"/>
    </div>
  )
})

export default Preloader