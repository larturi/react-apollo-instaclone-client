import React, { useState, useEffect } from 'react';
import { Search as SearchUI, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { size } from 'lodash';
import imgNotFound from '../../../assets/png/avatar.png';
import { useQuery } from '@apollo/client';
import { SEARCH } from '../../../gql/user';

import './Search.scss';

export default function Search() {
   const [search, setSearch] = useState('');
   const [results, setResults] = useState([]);
   const { loading, data } = useQuery(SEARCH, {
      variables: { query: search },
   });

   useEffect(() => {
      if (size(data?.search)) {
         const users = [];

         data.search.forEach((user, index) => {
            users.push({
               key: index,
               title: user.name,
               username: user.username,
               avatar: user.avatar,
            });
         });

         setResults(users);
      } else {
         setResults([]);
      }
   }, [data]);

   const onChange = (e) => {
      if (e.target.value) {
         setSearch(e.target.value);
      } else {
         setSearch('');
      }
   };

   const handleResultSelect = () => {
      setSearch(null);
      setResults([]);
   };

   return (
      <SearchUI
         className='search-users'
         fluid
         loading={loading}
         value={search || ''}
         input={{ icon: 'search', iconPosition: 'left' }}
         onResultSelect={handleResultSelect}
         onSearchChange={onChange}
         results={results}
         resultRenderer={(e) => <ResultSearch data={e} />}
      />
   );
}

const ResultSearch = (props) => {
   const { data } = props;
   return (
      <Link className='search-users__item' to={`/${data.username}`}>
         <Image src={data.avatar || imgNotFound} />
         <div>
            <p>{data.title}</p>
            <p>{data.username}</p>
         </div>
      </Link>
   );
};
