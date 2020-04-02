import React, { Component } from 'react'

class MemeGenerator extends Component{

    constructor(){
        super()
        this.state={
            topText:"",
            bottomText:"",
            middleText:"",
            randomImage:"http://i.imgflip.com/1bij.jpg",
            allMemeImages:[]
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                console.log(memes)
                this.setState({ allMemeImages: memes })
            })
    }
    handleChange(event){
        const {name,value}= event.target;
        console.log(event.target)
        this.setState({
            [name]:value
        })
    }
    handleSubmit(event){
        event.preventDefault()
        const randomIndex = Math.floor(Math.random()* this.state.allMemeImages.length)
        const randomMemeImage = this.state.allMemeImages[randomIndex].url
        this.setState({
            randomImage:randomMemeImage
        })
    }
    render(){
        return(
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input type="text" 
                    placeholder="Top Text" 
                    name="topText"value={this.state.topText} 
                    onChange={this.handleChange} />

                    <input type="text"
                     placeholder="Middle Text" 
                     name="middleText"
                      value={this.state.middleText} 
                      onChange={this.handleChange}/>

                    <input type="text"
                     placeholder="Bottom Text" 
                     name="bottomText"
                      value={this.state.bottomText} 
                      onChange={this.handleChange}/>

                    <button type="submit">Generate</button>
                </form>
                <div className="meme">
                    <h2 className="topText">{this.state.topText}</h2>
                    <h2 className="middleText">{this.state.middleText}</h2>
                    <img src={this.state.randomImage} alt="meme" />
                    <h2 className="bottomText">{this.state.bottomText}</h2>
                </div>
            </div>
            
         )
     
    }
}
export default MemeGenerator;
