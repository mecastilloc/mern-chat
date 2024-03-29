import React from "react";
import io from "socket.io-client";
import API from "../../utils/API";

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: []
        };

        this.socket = io('/');

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            const message = document.getElementById('message').value;
            const author = document.getElementById('author').value;
            let chatData={ 
                author: author,
                message: message
            }
            console.log("chat data ")
            console.log(chatData)
            API.saveChat(chatData)
                            .then((res) => {
                                console.log(res);
                            })
                            .catch(err => {
                                console.log(err);
                            });


            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            })
            
            
                        
            this.setState({message: ''});


        }

// this.saveMessage = () =>{
    
//     let chatData={ 
//         author: "mame",
//         message: "message"
//     }
//     console.log("chat data ")
//     console.log(chatData)
//     API.saveChat(chatData)
//                     .then(() => {
//                         console.log("Chat Saved");
//                     })
//                     .catch(err => {
//                         console.log(err);
//                     });

// }

    }
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat 10</div>
                                <hr/>
                                <div className="messages">
                                    {this.state.messages.map(message => {
                                        return (
                                            <div>{message.author}: {message.message}</div>
                                        )
                                    })}
                                </div>

                            </div>
                            <div className="card-footer">
                                <input id="author"type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
                                <br/>
                                <input id="message" type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                <br/>
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;