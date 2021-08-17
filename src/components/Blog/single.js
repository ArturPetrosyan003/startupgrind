import React from 'react';

import BlogItem from '../Hoc/BlogItem';

import BlogImage from '../../assets/images/blog.png';

const SingleBlog = (props) => {
    return (
        <div className='single_blog_container'>
            <h1>Last News</h1>

            <div className='single_blog_info_container'>
                <img src={BlogImage} />
                <p>Apart from counting words and characters, our online editor can help you to improve word choice and writing style. Apart from counting words. Apart from counting words and characters, our online editor can help you to improve word choice and writing style. Apart from counting words. Apart from counting words and characters, our online editor can help you to improve word choice and writing style. Apart from counting words. Apart from counting words and characters, our online editor can help you to improve word choice and writing style. Apart from counting words. Apart from counting words and characters, our online editor can help you to improve word choice and writing style. Apart from counting words and characters, our online editor can help you to improve word choice and writing style. Apart from counting words. Apart from counting words and characters, our online editor can help you to improve word choice and writing style. Apart from counting words. Apart from counting words and characters, our online editor can help you to improve word choice and writing style. Apart from counting words. Apart from counting words and characters, our online editor can help you to improve word choice and writing style. Apart from counting words. Apart from counting words and characters, our online editor can help you to improve word choice and writing style.</p>
            </div>

            <h1>Last News</h1>

            <div className='single_blog_bottom'>
                <BlogItem
                    image={BlogImage}
                    text='Post'
                    description='Apart from counting words and characters, our online editor can help you to improve word choice and writing style. Apart from counting words. Apart from counting words and characters, our online editor can help you to improve word choice and writing style. Apart from counting words.'
                />
                <BlogItem
                    image={BlogImage}
                    text='Post'
                    description='Apart from counting words and characters, our online editor can help you to improve word choice and writing style. Apart from counting words. Apart from counting words and characters, our online editor can help you to improve word choice and writing style. Apart from counting words.'
                />
                <BlogItem
                    image={BlogImage}
                    text='Post'
                    description='Apart from counting words and characters, our online editor can help you to improve word choice and writing style. Apart from counting words. Apart from counting words and characters, our online editor can help you to improve word choice and writing style. Apart from counting words.'
                />
            </div>
        </div>
    );
};

export default SingleBlog;