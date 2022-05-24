import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import UserTable from "./UserTable";

const checkboxes = [
  {
    id: "filter-username",
    name: "filter-username",
    pathFn: (user) => user.username,
    label: "Filter by Username",
  },

  {
    id: "filter-city",
    name: "filter-city",
    pathFn: (user) => user.address.city,
    label: "Filter by City",
  },

  {
    id: "filter-company",
    name: "filter-company",
    pathFn: (user) => user.company.name,
    label: "Filter by Company",
  },
];

export default function UserTableApp() {
  // 데이터를 필터링 하는 코드를 구현해보세요.
  // searchData - search에 기반이 되는 리스트입니다.
  const [searchData, setSearchData] = useState([]);
  // users - query를 기준으로 search하여 결과를 저장하는 리스트입니다.
  const [users, setUsers] = useState([]);
  // query - 유저의 입력입니다.
  const [query, setQuery] = useState("");
  // filters - filter name에 따른 pathFn을 저장하는 맵입니다.
  const [filters, setFilters] = useState({});

  const handleCheckboxChange = (pathFn) => (e) => {
    const name = e.target.name;
    if (e.target.checked) {
      // filter를 추가합니다.
      return setFilters((filterObj) => ({ ...filterObj, [name]: pathFn }));
    }

    // filter를 제거합니다.
    setFilters(({ [name]: _, ...rest }) => rest);
  };

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      const fetchedUsers = res.data;
      setUsers(fetchedUsers);
      setSearchData(fetchedUsers);
    });
  }, []);

  useEffect(() => {
    // query가 바뀔 때 서치 로직을 구현하세요.
    console.log("쿼리가 바뀌었습니다.", query);
  }, [query]);

  return (
    <Container>
      <div>
        <label htmlFor="search-query">Search</label>
        <input
          id="search-query"
          type="text"
          name="search-query"
          value={query}
          onChange={(e) => setQuery(e.target.value.trim().toLowerCase())}
        />
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setFilters({});
          }}
        >
          Reset
        </button>
      </div>

      <CheckboxController>
        {checkboxes.map(({ id, name, pathFn, label }) => (
          <Fragment key={id}>
            <input
              type="checkbox"
              id={id}
              name={name}
              onChange={handleCheckboxChange(pathFn)}
            />
            <label htmlFor={id}>{label}</label>
          </Fragment>
        ))}
      </CheckboxController>

      <UserTable users={users} />
    </Container>
  );
}

const Container = styled.div`
  min-height: 600px;
`;

const CheckboxController = styled.div`
  padding: 8px 0;

  input:not(:first-of-type) {
    margin-left: 20px;
  }
`;
