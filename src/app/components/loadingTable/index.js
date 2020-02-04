import React from 'react'

export const LoadTable = () =>{
    return(
        <div className="preloader-wrapper big active offset">
            <div className="spinner-layer spinner-blue-only">
                <div className="circle-clipper left">
                <div className="circle"></div>
                </div><div className="gap-patch">
                <div className="circle"></div>
                </div><div className="circle-clipper right">
                <div className="circle"></div>
                </div>
            </div>
        </div>
    )
}