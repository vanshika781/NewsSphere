import React, {useEffect,useState} from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

const News=(props)=>{
  const[articles,setarticles]=useState([])
  const[loading,setloading]=useState(false)
  const[page,setpage]=useState(1)
  const[totalResults,settotalResults]=useState(0)
  
  //this method executes after the render and asyn is added ki vo kuch time ka wait krre apne function mai jb tk data aaye naa
  
  useEffect(() => {
    document.title=`NewsSphere-${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`
    updatepage();},[]);
  

  const updatepage=async()=>{
    props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pagesize}`
    setloading(true);
    let data=await fetch(url);
    let parseddata=await data.json(data);
    props.setProgress(40);
    setarticles(parseddata.articles);
    settotalResults(parseddata.totalResults);
    setloading(false);
    props.setProgress(100);
  }
  const handleprvclick=async ()=>{
    setpage({
      page:page-1
    })
    updatepage();
  }
  const handlenextclick=async()=>{
    setpage({
      page:page+1
    })
    updatepage();
  }
    return (
      <div>
        <div className="container my-3">
          <h2 className="text-center" style={{marginTop:"90px"
          }}>NewsSphere - Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines</h2>
          {loading && <Spinner/>}
          <div className="row">
            {/* to iterate through the articles array !loading => yeh spinner ke liye hai jb loading hori hogi tb image na dikhe isliye */}
            {!loading && articles.map((element) => {
             return <div className="col-md-4 my-1" key={element.url}>
                {/* col-md-4 means for med devices it will take 4 cards in one line */}
                <Newsitem
                  title={(element.title===null || element.title==="[Removed]")?"US port strike ends, but clearing long ship queues will take time - Reuters":element.title}
                  description={(!element.description || element.title==="[Removed]")?"":element.description.slice(0,88)}
                  imageurl={element.urlToImage?element.urlToImage:"https://www.reuters.com/resizer/v2/MWOYLD4ZINKOBBYN5USFB44GPE.jpg?auth=d760a62efe240e0bfe44a5e59a9649af31334fd65346b887cfb32e2af2408618&height=1005&width=1920&quality=80&smart=true"}
                  newsurl={element.url}
                  author={element.author}
                  publishedAt={element.publishedAt}
                  source={element.source.name}
                />
              </div>;
            })}
          </div>
        </div>
        <div className="container d-flex justify-content-between">
        <button type="button" disabled={page<=1?true:false} className="btn btn-dark" onClick={handleprvclick}>&larr; Previous</button>
        <button type="button" className="btn btn-dark" disabled={page+1 > Math.ceil(totalResults/props.pagesize)} onClick={handlenextclick}>Next &rarr;</button>
        </div>
      </div>
    );
  }

News.defaultProps={
  country:'us',
  pagesize:8,
  category:'general'
}
News.propTypes={
  country:PropTypes.string,
  pagesize:PropTypes.number,
  category:PropTypes.string
}
export default News;
