import React from 'react'
import MsgContent from './msgContent'

const ViewMessage  = ({messages}) => {
    return(
        <div>
            { messages && messages.map(messages => {
                return(
                    <MsgContent messages ={messages} key ={messages.id} />
                )
            })}
        </div>
    )

}
export default  ViewMessage