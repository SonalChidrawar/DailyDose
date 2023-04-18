import React, {useState, useEffect} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(60);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);    //progress goes from 0 to 100
  }

  useEffect(() => {
  document.title = `${props.category} - NewsMonkey`;
    updateNews();
  }, []);

  const handlePrevClick = async () => {
    setPage(page-1)
    updateNews();
  };

  const handleNextClick = async () => {
    // if (
    //   !(
    //     page + 1 >
    //     Math.ceil(totalResults / props.pageSize)
    //   )
    // ) {
    //   setPage(page+1)
    //   updateNews();
    //   });
    // }
    setPage(page+1)
    updateNews();
  };

  const fetchMoreData = async () => {
    const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

    return (
      <div className="container my-3">
        <h2 className="text-center" style={{marginTop: 83}}>
          NewsMonkey - {props.category} Top Headlines
        </h2>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">

          <div className="row">
            {articles.map((element) => {
                return (
                  <div className="col-md-4">
                    <NewsItem
                      key={element.url}
                      title={element.title ? element.title : ""}
                      description={element.description? element.description.slice(0, 80): ""}
                      imageUrl={element.urlToImage}
                      url={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}/>
                  </div>
                );
              })}
          </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            disabled={
              page + 1 >
              Math.ceil(totalResults / props.pageSize)
            }
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
