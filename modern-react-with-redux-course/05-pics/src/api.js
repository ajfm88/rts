import axios from 'axios';

const searchImages = async (term) => {
  const response = await axios.get('https://api.unsplash.com/search/photos', {
    headers: {
      Authorization: 'Client-ID Gpf4N7K5VlwXK0a30IHkcEofXL-D7RzXOiBbfhtAo_8',
    },
    params: {
      query: term,
    },
  });

  return response.data.results;
};

export default searchImages;
