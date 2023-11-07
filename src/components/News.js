import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'


import PropTypes from 'prop-types'
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export class News extends Component {

    static defaultProps={
pageSize:6,
country:"in",
category:"general",

    }

    static propTypes={
        pageSize:PropTypes.number,
        country:PropTypes.string,
        category:PropTypes.string
    }
    
    constructor(props){
        super(props);
        console.log("i am a constructor");

        this.state= {
            articles: this.articles,
            loading: false,
            page:2}
            document.title=`${capitalizeFirstLetter(this.props.category)} - RNews`;
        
    }
    

    async componentDidMount(){
        
let url=` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=24ca2768a25a4f96bea7256a2a70e289&page=${this.state.page}&pageSize=${this.props.pageSize} `;
this.setState({ loading:true})
let data= await fetch(url);
let parseData=await data.json();
console.log(parseData);
this.setState({articles:parseData.articles,
    loading:false}
     )

     
    }

    handlepreviousclick=async()=>{
        

        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=24ca2768a25a4f96bea7256a2a70e289&page=${this.state.page-1}&pageSize=${this.props.pageSize}  `;
        this.setState({loading:true})
        let data= await fetch(url);
        let parseData=await data.json();
        console.log(parseData);
        this.setState({articles:parseData.articles,
        page:this.state.page-1,
    loading:false})
  

    }

    handlenextclick=async()=>{

     

        if(this.state.page +1> Math.ceil(this.state.totalResults/this.props.pageSize)){

        }
        else{

        let url=` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=24ca2768a25a4f96bea7256a2a70e289&page=${this.state.page+1}&pageSize=${this.props.pageSize} `;
this.setState({loading:true})
        let data= await fetch(url);
let parseData=await data.json();
console.log(parseData);
this.setState({articles:parseData.articles,
page:this.state.page+1,
loading:false})
    }
    
}


    render() {
        return (
            
                <div className="container my-3">
                    <h2 className="text-center"> Top Headlines </h2>
                    <h2 className="text-center">{this.state.loading && <Spinner/>}</h2>
                    <div className="container"> </div>
                   
                    <div className="row">
                        
                            { !this.state.loading && this.state.articles &&this.state.articles.map((element)=>{
                                return <div className=" col-md-4"  key={element.url}>
                                    <Newsitem title={element.title?element.title.slice(0,40):""} 
                                description={element.description?element.description.slice(0,80):""} imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} />
                                </div>
                            })}
                            
                        </div>
                       <div className="container d-flex justify-content-between">
                       <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlepreviousclick}>&larr; Previous</button>
                       <button disabled={ this.state.page +1> Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" class="btn btn-dark" onClick={this.handlenextclick}>Next &rarr;</button>
                       </div>
                    </div>
                
           
        )
    }
}


export default News
