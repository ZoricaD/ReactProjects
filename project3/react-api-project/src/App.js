import './App.css';
import { useEffect, useState } from "react";
import Categories from "./Categories";

function App() {
  const [category, setCategory] = useState('technology');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const API_KEY = 'pQyYNXXWUMZVHUyJv3CpBddPTl_z-CFlgnN3dw8Ws8-iFep7';

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
            `https://api.currentsapi.services/v1/latest-news?category=${category.toLowerCase()}&apiKey=${API_KEY}`
        );
        const data = await response.json();
        setArticles(data.news || []);
      } catch (error) {
        console.error('Error fetching news: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    setSearchQuery("");
    setSearchResults([]);
  }, [category]);


  const searchNews = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(
          `https://api.currentsapi.services/v1/search?keywords=${searchQuery}&language=en&apiKey=${API_KEY}`
      );
      const data = await response.json();
      setSearchResults(data.news || []);
    } catch (error) {
      console.error("Error fetching search results: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div>
        <h1>The News App</h1>
        <h3 className="h3-article">"Stay Informed, Stay Ahead – All the Latest News in One Place!"</h3>


        <div className="search-container">
          <h5 className="select-heading">Select what are you interested in -></h5>
          <Categories setCategory={setCategory} />

          {/* Поле за пребарување */}
          <div className="search-input-container">
            <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={searchNews}>Search</button>
          </div>
        </div>

        {loading ? (
            <p>Loading...</p>
        ) : (
            <div>
              {searchResults.length > 0 ? (
                  <div>
                    <h2>Search Results:</h2>
                    <div className="articles-container">
                      {searchResults.map((article, index) => (
                          <div key={index} className="article">
                            <img src={article.image} alt="Not available photo for this article" className="article-image" />
                            <h3>{article.title}</h3>
                            <p>{article.description}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                              Read more
                            </a>
                          </div>
                      ))}
                    </div>
                  </div>
              ) : (
                  <div>
                    <h2>Latest {category} News</h2>
                    {articles.length === 0 ? (
                        <p>No articles found</p>
                    ) : (
                        <div className="articles-container">
                          {articles.map((article, index) => (
                              <div key={index} className="article">
                                <img src={article.image} alt="Not available" className="article-image" />
                                <h3>{article.title}</h3>
                                <p>{article.description}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer">
                                  Read more
                                </a>
                              </div>
                          ))}
                        </div>
                    )}
                  </div>
              )}
            </div>
        )}
      </div>
  );
}

export default App;
