import React, { useEffect, useState } from "react";
import axios from "axios";
import usePagination from "./paginationHook";

const PokemansList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=200`)
      .then((response) => {
        setData(response.data.results);
        setLoading(false);
      });
  }, []);
  const itemsPerPage = 10;

  const ListData = usePagination(data, itemsPerPage);

  return (
    <div>
      <h2>pokemans list is here</h2>
      {ListData.currentData().map((item, index) => {
        return loading ? (
          <p>loading...</p>
        ) : (
          <ul key={index} style={{ listStyleType: "none" }}>
            <li>
              <span style={{ fontWeight: "bold" }}>name :</span> {item.name}{" "}
              <br />
              <span style={{ fontWeight: "bold" }}>url :</span> : {item.url}
            </li>
          </ul>
        );
      })}
      <button onClick={ListData.prev} disabled={ListData.currentPage === 1}>
        Previous
      </button>
      <button onClick={ListData.next} disabled={ListData.currentPage === 10}>
        Next
      </button>
    </div>
  );
};

export default PokemansList;
