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
    <div>
      <h1 className="text-center text-2xl font-bold mt-10">Categories</h1>

      <Tabs defaultValue="gallery">
        <Tabs.List>
          {category.map((cat) => (
            <Tabs.Tab value={cat}>{cat}</Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </div>
  );
};
