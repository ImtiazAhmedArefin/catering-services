// src/pages/Blog.js

import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import TestimonialSection from '../components/Testimonial';
import Weblayout from '../layout/Weblayout';
import RightStickyBar from "../components/RightStickyBar";

const posts = [
  {
    img: 'blog-1.jpg',
    date: '16',
    month: 'Sep',
    title: 'How to get more taste in your food from',
    to: '/blog/post-1',
    delay: 0.1,
  },
  {
    img: 'blog-2.jpg',
    date: '16',
    month: 'Sep',
    title: 'How to get more taste in your food from',
    to: '/blog/post-2',
    delay: 0.3,
  },
  {
    img: 'blog-3.jpg',
    date: '16',
    month: 'Sep',
    title: 'How to get more taste in your food from',
    to: '/blog/post-3',
    delay: 0.5,
  },
];

export default function Blog() {
  return (
    <Weblayout>
      <RightStickyBar/>
      {/* <!-- Blog Start --> */}
      <div className="container-fluid blog py-6">
        <div className="container">
          <div className="text-center wow bounceInUp" data-wow-delay="0.1s">
            <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
              Our Blog
            </small>
            <h1 className="display-5 mb-5">Be First Who Read News</h1>
          </div>
          <div className="row gx-4 justify-content-center">
            {posts.map((post, idx) => (
              <div
                className="col-md-6 col-lg-4 wow bounceInUp"
                data-wow-delay={`${post.delay}s`}
                key={idx}
              >
                <div className="blog-item">
                  <div className="overflow-hidden rounded">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/img/${post.img}`}
                      className="img-fluid w-100"
                      alt={post.title}
                    />
                  </div>
                  <div className="blog-content mx-4 d-flex rounded bg-light">
                    <div className="text-dark bg-primary rounded-start">
                      <div className="h-100 p-3 d-flex flex-column justify-content-center text-center">
                        <p className="fw-bold mb-0">{post.date}</p>
                        <p className="fw-bold mb-0">{post.month}</p>
                      </div>
                    </div>
                    <Link
                      to={post.to}
                      className="h5 lh-base my-auto h-100 p-3 text-dark text-decoration-none"
                    >
                      {post.title}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <!-- Blog End --> */}

      <TestimonialSection />
    </Weblayout>
  );
}