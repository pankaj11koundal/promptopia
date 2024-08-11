'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react';
import Form from '../../components/Form';
import { useRouter } from 'next/navigation';

const CreatePrompt = () => {

  const {data: session} = useSession();
  const router = useRouter();
  // State variables
  const [sumbitting, setSumbitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });
    
  // event handlers
  const createPrompt = async (e) => {
    e.preventDefault()
    setSumbitting(true);

    try {
        const repsonse = await fetch('api/prompt/new', {
            method: 'POST',
            body: JSON.stringify({
                prompt: post.prompt,
                userId: session?.user.id,
                tag: post.tag,
            })
        })
        
        if (repsonse.ok) {
            router.push('/')
        }
    } catch (e) {
        console.log(e);
    } finally {
        setSumbitting(false);
    }
  }

  return (
    <Form 
      type="Create"
      post={post}
      setPost={setPost}
      sumbitting={sumbitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt