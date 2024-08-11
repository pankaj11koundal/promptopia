'use client'

import { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
    {
      data.map((prompt) => (
        <PromptCard 
          key={prompt._id}
          post={prompt}
          handleTagClick={handleTagClick}
        />
    ))}
    </div>
  )
}

const Feed = () => {

  // useState variable
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('api/prompt')
      const data = await response.json();

      setPrompts(data);
    }
    fetchPosts();
  }, []) 

  //event handlers
  const handleSearchChange = (e) => {

  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text'
          placeholder='Search of username or tag'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList 
        data={prompts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed