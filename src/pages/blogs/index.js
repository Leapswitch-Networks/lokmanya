import React, { useState, useEffect } from "react";
// import "./blogListing.css";
// import React, { useState, useEffect } from "react";

import Icon1 from "@/site/assets/images/blogListing/blog-main.webp";
import Icon2 from "@/site/assets/images/blogListing/smallBlog.webp";
import Link from "next/link";
import Pagination from "@/site/components/Pagination";
import { fetchAllBlog } from "@/ApiActions/Admin/BlogApi";
// import Skeleton from "react-loading-skeleton";
// import 'react-loading-skeleton/dist/skeleton.css';
// import Image from "next/image";



const Blogs = () => {
  // const [isLoading, setIsLoading] = useState(true);


  const [recentBlogs, setRecentBlogs] = useState([]);
  const [pagedBlogs, setPagedBlogs] = useState([]);
  const [totalCount, settotalCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  // const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        // setIsLoading(true);
        const data = await fetchAllBlog({
          page: currentPage,
          pageSize: itemsPerPage,
        });

        const { initialBlogs, paginatedBlogs, totalCount } = data.data;

        setRecentBlogs(initialBlogs || []);
        setPagedBlogs(paginatedBlogs || []);
        settotalCount(totalCount || 0);
      } catch (err) {
        console.error("Error fetching blog data:", err);
      } finally {
        // setIsLoading(false);
      }
    };

    getData();
  }, [currentPage, itemsPerPage]);





  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
    }
  }, [currentPage]);



  // Fetch blogs using Axios
  // const fetchBlogs = async (page) => {
  //     try {
  //         const response = await axiosConfig.get('/get-blog-list', {
  //             params: {
  //                 page,
  //                 pageSize: itemsPerPage,
  //             },
  //         });

  //         if (response.status === 200) {
  //             const { initialBlogs, paginatedBlogs, totalCount } = response.data;
  //             setRecentBlogs(initialBlogs || []);
  //             setPagedBlogs(paginatedBlogs || []);
  //             setPagedBlogs(paginatedBlogs || []);
  //             settotalCount(totalCount || 0);
  //         }
  //     } catch (error) {
  //         console.error("Error fetching blogs:", error);
  //     }
  // };

  // Fetch blogs when the component mounts or currentPage changes
  // useEffect(() => {
  //     fetchBlogs(currentPage);
  // }, [currentPage]);

  const baseURL = process.env.NEXT_PUBLIC_FILE_BASE_URL || '';



  return (
    <>

      <title>Health and Wellness Blogs | Lokmanya Hospitals</title>
      <meta
        name="description"
        content="Browse expert blogs for patient care, treatments, and health improvement tips from Lokmanya Hospitals."
      />

      {/* recent blogs */}
      <section className="recentBlogs recentBlogsListing section-space-blog side-space-blog">
        <div className="row g-3">
          {/* Left side: Big Card */}
          <div className="col-lg-6 col-md-12">
            {
            // isLoading ? (
            //   <div className="bigCard bigblogcrd">
            //     <Skeleton height={300} />
            //     <div className="recentContent mt-3">
            //       <Skeleton height={24} width={`80%`} />
            //       <Skeleton count={3} />
            //     </div>
            //   </div>
            // ) : (
              recentBlogs[0] && (
                <Link href={`/blogs/${recentBlogs[0].slug}`} key={recentBlogs[0].id} className="recent-media">
                  <div className="bigCard bigblogcrd">
                    <div className="bigImage bg-blg-img">
                      <img src={`${baseURL}/${recentBlogs[0].thumbnil_image || Icon1.src}`} crossOrigin="anonymous" alt="blog" />
                    </div>
                    <div className="recentContent">
                      <div className="content">
                        <h3>{recentBlogs[0].title}</h3>
                        <p className="mb-0">
                          Explore the newest health trends, expert tips, and medical breakthroughs to help you stay informed and make better wellness choices every day.
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            // )
            }
          </div>


          {/* Right side: Cards generated using map */}
          <div className="col-lg-6 col-md-12">
            <div className="row g-2">
              {
              // isLoading
              //   ? Array.from({ length: 4 }).map((_, index) => (
              //     <div className="col-md-6" key={index}>
              //       <div className="smallCard sml-blg-crd">
              //         <Skeleton height={100} />
              //         <div className="smallContent mt-2">
              //           <Skeleton height={20} width={`90%`} />
              //         </div>
              //       </div>
              //     </div>
              //   )): 
                recentBlogs.slice(1).map((blog, index) => (
                  <div className="col-md-6" key={index}>
                    <Link className="smallCard sml-blg-crd" href={`/blogs/${blog.slug}`}>
                      <div className="smallImage sm-blg-img">
                        <img src={`${baseURL}/${blog.thumbnil_image || Icon2.src}`} crossOrigin="anonymous" alt="blog" />
                      </div>
                      <div className="smallContent">
                        <h4>{blog.title}</h4>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>



      {/* more blogs */}
      <section className="moreBlogs recentBlogs recentBlogsListing side-space section-below-space">
        {/* Blog Cards */}
        <div className="blogHead">
          <h1 className="section-heading-left">Lokmanya Hospital Blogs: Your Guide to Better Health & Recovery</h1>
        </div>
        <div className="row g-2">
          {
          // isLoading
          //   ? Array.from({ length: 6 }).map((_, index) => (
          //     <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
          //       <div className="smallCard sml-blg-crd">
          //         <Skeleton height={180} />
          //         <div className="smallContent mt-2">
          //           <Skeleton height={20} width={`80%`} />
          //         </div>
          //       </div>
          //     </div>
          //   )): 
            pagedBlogs.map((blog, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                <Link href={`/blogs/${blog.slug}`} className="blogs-card-link">
                  <div className="smallCard sml-blg-crd">
                    <div className="smallImage sm-blg-img">
                      <img src={`${baseURL}/${blog.thumbnil_image || Icon2.src}`} crossOrigin="anonymous" alt="blog" />
                    </div>
                    <div className="smallContent">
                      <h4>{blog.title}</h4>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
        {/* Pagination */}
        {/* {console.log('totalCount',totalCount)} */}
        {totalCount > 15 &&
          <div className="pagination-container">
            <Pagination
              totalItems={totalCount}
              itemsPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        }

      </section>

    </>
  );
};

export default Blogs;
