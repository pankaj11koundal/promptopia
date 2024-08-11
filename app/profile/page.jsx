'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '../../components/Profile'

const ProfilePage = () => {
  // Hooks variable
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json();

      setPosts(data);
    }
    if (session?.user.id) fetchPosts();
  }, [session]) 

  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE"
        })

        const filteredPosts = posts.filter((p) => p._id !== post._id)
        console.log(filteredPosts); 
        setPosts(filteredPosts);
        
      } catch (e) {
        console.log(e)
      }
      console.log(posts);
    }
  }


  return (
    <Profile 
        name='My'
        desc='Welcome to your prersolnalized profile page'
        data={posts}
        handleEdit={(prompt) => handleEdit(prompt)}
        handleDelete={ handleDelete}
    />
  )
}

export default ProfilePage