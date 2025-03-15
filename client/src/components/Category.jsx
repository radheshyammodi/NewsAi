import React, { useState } from "react";
import { Skeleton, Tabs } from "@mantine/core";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import ArticleCard from "./ArticleCard";

export const Category = () => {
  const [category, setCategory] = useState("general");

  const categories = [
    "General",
    "Sports",
    "Entertainment",
    "Politics",
    "Business",
    "Technology",
    "Health",
    "Science",
  ];

  const fetchNewsByCategory = async ({ pageParams = 1 }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/news/${category}`,
        { params: { page: pageParams } }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, hasNextPage, fetchNextPage, status, isLoading } = useInfiniteQuery({
    queryKey: ["category", category],
    queryFn: fetchNewsByCategory,
    getNextPageParam: (lastPage) => {
      // console.log('lastPage: ', lastPage)
      return lastPage.nextPage;
    },
  });

  console.log(data);

  return (
    <div className="py-12 px-10">
      <h1 className="text-center text-2xl font-bold my-10">Categories</h1>

      <Tabs
        defaultValue="gallery"
        onChange={(value) => setCategory(value.toLowerCase())}
      >
        <Tabs.List>
          {categories.map((cat) => (
            <Tabs.Tab className="text-gray-200" size="lg" value={cat}>
              {cat}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>

      <div className="mt-14">
        <InfiniteScroll
          dataLength={
            data?.pages.length >= 0 &&
            data?.pages.reduce((total, page) => total + page.news.length, 0)
          }
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={
            <p style={{ textAlign: "center", margin: "20px 20px" }}>
              Loading...
            </p>
          }
          endMessage={
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No more news
            </p>
          }
        >

        {isLoading ? <div className="space-y-6">
          <Skeleton height={100}/>
          <Skeleton height={20}/>
          <Skeleton height={30}/>
        </div> :
          
          <div className="space-y-6">
          {data?.pages.length >= 0 &&
            data?.pages.map((page, index) =>
              page.news.map((article) => (
                <ArticleCard article={article} category={category} />
              ))
            )}
            </div> }
        
        </InfiniteScroll>
      </div>
    </div>
  );
};
