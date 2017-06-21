import axios from 'axios';
import _ from 'lodash';

function convertHtmlToText(inputText) {
    var returnText = "" + inputText;

    //-- remove BR tags and replace them with line break
    returnText=returnText.replace(/<br>/gi, "\n");
    returnText=returnText.replace(/<br\s\/>/gi, "\n");
    returnText=returnText.replace(/<br\/>/gi, "\n");

    //-- remove P and A tags but preserve what's inside of them
    returnText=returnText.replace(/<p.*>/gi, "\n");
    returnText=returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

    //-- remove all inside SCRIPT and STYLE tags
    returnText=returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
    returnText=returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
    //-- remove all else
    returnText=returnText.replace(/<(?:.|\s)*?>/g, "");

    //-- get rid of more than 2 multiple line breaks:
    returnText=returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\n\n");

    //-- get rid of more than 2 spaces:
    returnText = returnText.replace(/ +(?= )/g,'');

    //-- get rid of html-encoded characters:
    returnText=returnText.replace(/&nbsp;/gi," ");
    returnText=returnText.replace(/&amp;/gi,"&");
    returnText=returnText.replace(/&quot;/gi,'"');
    returnText=returnText.replace(/&lt;/gi,'<');
    returnText=returnText.replace(/&gt;/gi,'>');

    //-- return
    return returnText;
}

function processResults (results) {
  let works = results.getElementsByTagName('work');
    works = _.map(works, work => {
      const book = {},
        id = work.childNodes[17].childNodes[1].textContent,
        title = work.childNodes[17].childNodes[3].textContent,
        author = work.childNodes[17].childNodes[5].childNodes[3].textContent,
        cover = work.childNodes[17].childNodes[7].textContent;

      if (id.length > 0) { book.id = id };
      if (title.length > 0) { book.title = title };
      if (author.length > 0) { book.author = author };
      if (cover.length > 0) { book.cover = cover };
      book.added = Date.now();
      
      return book;
    });
  return works;
}

function fetchResults (term) {
  const encodedURI = window.encodeURI('https://www.goodreads.com/search/index.xml?key=eJW7fsSEHdVNHTCDiTBchQ&q=' + term);
  const parser = new DOMParser();

  return axios.get(encodedURI)
    .then(function (response) {
      const doc = parser.parseFromString(response.data, 'application/xml');
      
      return doc;
    });
}

export default {
  search: function (term) {
    const results = fetchResults(term);

    const processedResults = results.then(results => {
      return processResults(results);
    });

    return processedResults;
  },

  fetchBookData: function (bookId) {
    const encodedURI = window.encodeURI('https://www.goodreads.com/book/show/' + bookId + '.xml?key=eJW7fsSEHdVNHTCDiTBchQ');
    const parser = new DOMParser();

    return axios.get(encodedURI)
      .then(function (response) {
        const doc = parser.parseFromString(response.data, 'application/xml'),
          matchedBooks = doc.getElementsByTagName('book'),
          book = {},
          months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          pubMonth = matchedBooks[0].childNodes[23].textContent,
          id = matchedBooks[0].childNodes[1].textContent,
          description = matchedBooks[0].childNodes[33].textContent,
          pubYear = matchedBooks[0].childNodes[21].textContent,
          link = matchedBooks[0].childNodes[51].textContent;

        if (id.length > 0) { book.id = id };
        if (description.length > 0) { book.description = convertHtmlToText(description) };
        if (pubMonth.length > 0) { book.pubMonth = months[+pubMonth - 1]};
        if (pubYear.length > 0) { book.pubYear = pubYear};
        if (link.length > 0) { book.link = link};

        return book;
      });
  }
}