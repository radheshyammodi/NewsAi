import React from "react";
import { Tabs } from "@mantine/core";

export const Category = () => {
  const category = [
    "Sports",
    "Entertainment",
    "Politics",
    "Business",
    "Technology",
    "Health",
  ];

  return (
    <div className="py-12 px-10">
      <h1 className="text-center text-2xl font-bold my-10">Categories</h1>

      <Tabs defaultValue="gallery">
        <Tabs.List>
          {category.map((cat) => (
            <Tabs.Tab className='text-gray-200' size="lg" value={cat}>{cat}</Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </div>
  );
};
