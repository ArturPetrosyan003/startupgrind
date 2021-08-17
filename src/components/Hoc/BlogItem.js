import React from 'react';

import { Link } from 'react-router-dom';

import BlogImage from '../../assets/images/blog.png';


const BlogItem = (props) => {
    return (
        <div className='blog_card_container'>
            <div className='blog_card'>
                <img src={BlogImage} />

                <h2>{props.text}</h2>

                <p>{props.description}</p>

                <Link to={`/blog/single/${props.id}`}>
                    <button>
                        Show more
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default BlogItem;