import { TextInput, Loader } from "@mantine/core";
import axios from "axios";
import { Search } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export const LiveSearch = () => {
  const searchRef = useRef();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const handleOutSideClick = (event) => {
      console.log(searchRef.current);
      console.log(!searchRef.current.contains(event.target));

      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    window.addEventListener("click", handleOutSideClick);
    return () => window.removeEventListener("click", handleOutSideClick);
  }, []);

  useEffect(() => {
    if (query.length < 1) {
      setResult([]);
      setDropdown(false);
      return;
    }

    const fetchData = async () => {
      setDropdown(true);
      setLoading(true);
      try {
        const res = await axios.get(
          `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEWS_API_KEY}`
        );

        setResult(res.data.articles);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      setLoading(false);
    };

    const timeOut = setTimeout(fetchData, 500);
    return () => clearTimeout(timeOut);
  }, [query]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-md"
      ref={searchRef}
    >
      <TextInput
        radius={10}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Here"
        leftSection={<Search size={20} />}
      />

      {dropdown && (
        <div className="absolute p-2 mt-2 max-h-[300px] overflow-y-scroll bg-white w-full shadow rounded-sm">
          {loading ? (
            <div className="flex px-4 py-8 justify-center items-center gap-4">
              <Loader size={20} />
              <p>Searching...</p>
            </div>
          ) : result.length > 0 ? (
            <div className="flex gap-3 flex-col">
              {result?.map((d) => (
                <a
                  href={d.url}
                  target="_blank"
                  className="flex items-center gap-4 hover:bg-gray-100 p-1 cursor-pointer rounded-md"
                >
                  <img
                    className="h-16 w-16 object-cover rounded-md"
                    src={d.urlToImage || "https://placehold.co/16x16"}
                  />
                  <p>{d.title}</p>
                </a>
              ))}
            </div>
          ) : (
            <p className="px-2 py-4 text-center">No result found</p>
          )}
        </div>
      )}
    </motion.div>
  );
};
