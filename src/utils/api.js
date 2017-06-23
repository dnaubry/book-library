import axios from 'axios';

function processResults (results) {
  if (results.data.totalItems === 0) {
    return results = {};
  } else {
    let works = results.data.items;
    works = works.map(work => {
      const book = {},
        id = work.id,
        title = work.volumeInfo.title,
        author = work.volumeInfo.authors[0],
        publishedDate = work.volumeInfo.publishedDate,
        description = work.volumeInfo.description,
        link = work.volumeInfo.infoLink;

      if (id !== undefined && id.length > 0) { book.id = id };
      if (title !== undefined && title.length > 0) { book.title = title };
      if (author !== undefined && author.length > 0) { book.author = author };
      if (publishedDate !== undefined && publishedDate.length > 0) {book.publishedDate = publishedDate};
      if (description !== undefined && description.length > 0) { book.description = description };
      if (link !== undefined && link.length > 0) { book.link = link };
      book.added = Date.now();
      
      return book;
    });
  return works;
  }
  
}

export default {
  search: function (term) {
    const encodedURI = window.encodeURI(`https://www.googleapis.com/books/v1/volumes?q=${term}`);

    return axios.get(encodedURI)
      .then(response => {
        return processResults(response);
      });
  }
}
