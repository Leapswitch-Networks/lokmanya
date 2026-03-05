import Image from "next/image";
import Link from "next/link";
import React from "react";
// import ButtonPrimary from "../controls/ButtonPrimary";

const BlogComponent = ({ data }) => {
    return (
        <section className="insights section side-space section-space">
            <h2 className="section-heading">Featured Blogs</h2>
            <div className="row g-md-4 g-3 justify-content-center">
                {data?.map((item, index) => (
                    <div className="col-lg-3 col-md-4 col-6" key={index}>
                        <Link href={item.link || "/"} className="insight-card">
                            <div className="insight-img">
                                <Image height={195} width={290} src={item.image} alt={item.title || "insights card"} />
                            </div>
                            <div className="insight-info">
                                <span className="category ellipsis">{item.category}</span>
                                <time className="date-time ellipsis">{item.date}</time>
                            </div>
                            <h4 className="blog-ttl mb-0">{item.title}</h4>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="h-center mt-3">
                <Link href="/blogs" className="button-primary btn-white">
                    <span>View More</span>
                </Link>
            </div>
        </section>
    );
};

export default BlogComponent;
