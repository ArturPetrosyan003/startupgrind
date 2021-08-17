import React from 'react';

import BlogItem from '../Hoc/BlogItem';

import BlogImage from '../../assets/images/blog.png';

const Blog = () => {

    const testData = {
        id: 1,
        img: BlogImage,
        text: 'Post',
        description: 'Apart from counting words and characters, our online editor can help you to improve word choice and writing style. Apart from counting words. Apart from counting words and characters, our online editor can help you to improve word choice and writing style. Apart from counting words.'
    }

    return (
        <div className='blog_container'>

            <div className='blog_main'>
                <h1>Last news</h1>

                <BlogItem
                    image={testData.image}
                    text={testData.text}
                    description={testData.description}
                />
            </div>
        </div>
    );
};

export default Blog;