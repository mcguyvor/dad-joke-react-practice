import React, { Component } from 'react';
import './Joke.css'
class Joke extends Component {
// change the border color for vote 
    getColor(){
        if(this.props.vote>=15){
            return 'green';
        }else if(this.props.vote>=12){
            return 'yellow';
        }else if(this.props.vote>=9){
            return 'orange';
        } else
        return 'red';
    }
    //change emogi 
    getEmoji(){
        if(this.props.vote>=15){
            return <i class="em em-rolling_on_the_floor_laughing"></i>;
        }else if(this.props.vote>=12){
            return <i class="em em-hugging_face"></i>;
        }else if(this.props.vote>=9){
            return <i class="em em-grinning"></i>;
        } else
        return <i class="em em-angry"></i>;
    }
    render(){
        return(
            <div className='Joke'>
                <div className='Joke-buttons'>
                    <i className='fas fa-arrow-up' onClick={this.props.upvote}></i>
                    <span className='Joke-dad-vote' style={{borderColor: this.getColor()}}>{this.props.vote}</span>
                    <i className="fas fa-arrow-down" onClick={this.props.downvote}></i>                
                    </div>
                <div className='Joke-text'>
                {this.props.text}
                </div>
                <div className='Smiley-icon'>{this.getEmoji()}</div>
            </div>
        );
    }
}
export default Joke;