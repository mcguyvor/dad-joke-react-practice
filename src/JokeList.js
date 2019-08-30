import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke'
import './JokesList.css'
import uuid from 'uuid/v4'
class JokeList extends Component{
    static defaultProps ={
        numJokeToGet : 10
    };
    constructor (props) {
        super(props);
        this.state={Jokes : JSON.parse(window.localStorage.getItem('jokes') || '[]')// check the local storage in window if have local storage use that local storage to stage
       // this.generateJoke = this.generateJoke.bind(this);
                ,loading : false
                }
    this.seenJoke = new Set(this.state.Jokes.map(val=> val.text));
    console.log(this.seenJoke);
    this.handleClick = this.handleClick.bind(this);
}

    
    //fetch api from dadjoke api using \componentDidMount() 
    componentDidMount() {
       if(this.state.Jokes.length===0){
            this.getJokes();
       }
    }

      async getJokes() {
          try{
        let jokes =[];
        while(jokes.length<this.props.numJokeToGet){// jokes refer to array online 15
         let response =  await axios.get('https://icanhazdadjoke.com/',{ 
             headers:{
                 Accept:'application/json'}});
        if(!this.seenJoke.has(response.data.joke)){     
         jokes.push({text:response.data.joke, vote:0,id:uuid()}); //push data to emty array
        
         console.log(response.data.joke);
        }
        else{
            console.log(response.data.joke)
        }
                                                }
         this.setState(prevState=>({
             loading : false,
             Jokes : [...prevState.Jokes,...jokes]
         }),
         window.localStorage.setItem('jokes',JSON.stringify(jokes)));
         window.localStorage.setItem('jokes',JSON.stringify(jokes));
        }catch(e){
            alert(e);
            this.setState({loading:false})
        }
        }
    
    
        
    
handleVote(id, delta){
    this.setState(
        prevState=>({
            Jokes : prevState.Jokes.map(j=>
                j.id=== id? {...j,vote:j.vote + delta} : j)
        }),
        ()=> window.localStorage.setItem('jokes',JSON.stringify(this.state.Jokes))
    );
}
handleClick(){
    this.setState({
        loading: true
    })
    this.getJokes()
}
render(){
    if(this.state.loading === true){
        return (
            <div className='Spinner'>
                <div className='Loader'></div>
                <h1 class='JokeList-title'>Loading</h1>
            </div>
        )
    }
    let jokes = this.state.Jokes.sort((a,b)=> b.vote-a.vote)
        return(
            <div className='JokeList'>
                <div className='JokeList-sidebar'>
                    <h1 className='JokeList-title'>
                    <span>Dad</span>joke
                    </h1>
                    <img src = 'https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg'/>
                    <button onClick={this.handleClick} className='JokeList-getmore' >New Joke</button>
                </div>
                
                <div className='JokeList-jokes'>
                    {jokes.map(st=>(
                        <Joke key={st.id}text={st.text} vote={st.vote} upvote={()=>this.handleVote(st.id,1)} downvote={()=>this.handleVote(st.id,-1)}/>
                    ))}
                </div>
            </div>
        );
    }
}
export default JokeList;