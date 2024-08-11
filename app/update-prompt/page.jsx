'use client'
import { useState, useEffect } from 'react'
import Form from '../../components/Form';
import { useRouter, useSearchParams } from 'next/navigation';

const UpdatePrompt = () => {
    // Hook variables
    const router = useRouter();
    const searchPrams = useSearchParams();
    const [sumbitting, setSumbitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });
    
    // Functional Variable
    const promptId= searchPrams.get('id');
    
    useEffect(()=> {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json();
            
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
            console.log(post);
        }

        if (promptId) getPromptDetails();
    }, [promptId])

    const updatePrompt = async (e) => {
        console.log("Inside updatePrompt")
        e.preventDefault()
        setSumbitting(true);

        if (!promptId) return alert('Prompt ID not found');

        try {
            const repsonse = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })

            if (repsonse.ok) {
                router.push('/')
            }
        } catch (e) {
            console.log("inside catch")
            console.log(e);
        } finally {
            setSumbitting(false);
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            sumbitting={sumbitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default UpdatePrompt