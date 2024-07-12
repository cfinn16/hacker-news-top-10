import React, {useState, useEffect} from 'react'

const HackerNewsTop10 = () => {
  const [ids, setIds] = useState([])
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    let ignore = false

    async function fetchIds() {
      const ids = await fetch(`https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty&limitToFirst=10&orderBy="$priority"`)
        .then(res => res.json())
        .then(data => {
          if (!ignore) setIds(data)
        })
    }

    fetchIds()

    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    let ignore = false
    const fetchPosts = async() => {
      const promises = ids.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`).then(y => y.json()))

      await Promise.all(promises).then(results => {
        if (!ignore) setPosts(results)
        
    });
    }

    fetchPosts()

    return () => {
      ignore = true
    }
  }, [ids])

  return (
    <div>
      {posts.length > 0 && 
        <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <a href={post.url}>{post.title}</a>
              <p>{post.score} by {post.by}</p>
            </li>
          )   
        })}
      </ul>
        
      }
    </div>
  )
};

export default HackerNewsTop10;
