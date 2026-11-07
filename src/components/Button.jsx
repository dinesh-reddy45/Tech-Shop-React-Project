import React from 'react'

function Button({type,buttonName,className,id,onClick}) {
  return (
   <>
   <button type={type} className={className} id={id} onClick={onClick}>{buttonName}</button>
   </>
  )
}

export default Button