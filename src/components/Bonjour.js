import React from 'react'

function Bonjour({user}) {
  return (
    <div>
      <h1 className="bonjour">Bonjour {user}</h1>
      <div className="objectifs">Félicitations ! Vous avez explosé vos objectifs hier</div>
    </div>
  )
}

export default Bonjour
