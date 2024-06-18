// Author : Ramaguru Radhakrishnan
// Created Date : 11-Nov-2021
// Updated Date : 30-Oct-2022
// Description: To get the Google Scholar Publications and Citation Stats


function openTab(tabName) {
  var i, tabContent;

  tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  document.querySelectorAll('button').forEach(function(tabButton) {
    tabButton.classList.remove('active-tab');
  });
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.classList.add('active-tab');
}

function show_hide(x) {
  x.classList.toggle("change");
  var dropdownContent = document.querySelector('.dropdown-content');
  dropdownContent.style.display = (dropdownContent.style.display === 'none' || dropdownContent.style.display === '') ? 'block' : 'none';
}
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("7f9f9c41b5d103050275e9c3258d9d45e4a4fcec333b24bff50bd3ddb4c08f09");

console.log("\nFetching the details from Google Scholar");

// Define author IDs and their corresponding callbacks
const authors = [
  { id: "Xl_P9V0AAAAJ", name: "Dr. M. Sethumadhavan" },
  { id: "nlt0DD4AAAAJ", name: "Dr. Chungath Srinivasan" },
  { id: "K2n1nh0AAAAJ", name: "Dr. Lakshmy K.V" },
  { id: "8AwtAWsAAAAJ", name: "Dr. Amritha P P" },
  { id: "NHVcW84AAAAJ", name: "Dr. Praveen K" },
  { id: "W6nvRkQAAAAJ", name: "Mr. Ashok Kumar Mohan" },
  { id: "QdXcVjUAAAAJ", name: "Mr. Saurabh Shrivastava" },
  { id: "-DjvKqgAAAAJ", name: "Mr. Ramaguru Radhakrishnan" },
  { id: "jaxJad8AAAAJ", name: "Dr. Sangeetha Viswanathan" },
  { id: "ZWxL_tkAAAAJ", name: "Ms. Ambili K N" },
  { id: "D9kO6VgAAAAJ", name: "Mr. Rajeev K" },
  { id: "8q2B8WYAAAAJ", name: "Mr. Aravind Vishnu S S" },
  { id: "weIsDiIAAAAJ", name: "Mr. Harish R" },
  { id: "ZWxL_tkAAAAJ", name: "Ms. Merly Anne Philip" },
  { id: "ZWxL_tkAAAAJ", name: "Mr. Joseph Nelson" },
  { id: "ZWxL_tkAAAAJ", name: "Ms. Zeenath A U" }
];

// Callback function for search.json
function callback(data) {
  const author = data['author']['name'];
  const publications = data['articles'].length;
  const citations_c = data['cited_by']['table'][0]['citations']['all'];
  const hindex_c = data['cited_by']['table'][1]['h_index']['all'];
  const i10index_c = data['cited_by']['table'][2]['i10_index']['all'];
  console.log( author + " has " + publications + " publications ~~~ citations : " + citations_c + ", h-index : " + hindex_c + ", i10-index : " + i10index_c);
  console.log("----------------------------------------------------------------------------------------------");
  const outputHTML = `
    <div>
      <h2>${author}</h2>
      <p>Publications: ${publications}</p>
      <p>Citations: ${citations_c}</p>
      <p>h-index: ${hindex_c}</p>
      <p>i10-index: ${i10index_c}</p>
    </div>
  `;
  
  document.getElementById('output').innerHTML = outputHTML;
  const ramImagesDiv = document.querySelector('.ram_images');
  if (ramImagesDiv) {
    ramImagesDiv.style.display = 'none';
  }
}

function checkeventbyID (event) {
  alert(`Submitted Successfully!`);
  const enteredId = document.getElementById('Search_by_Id').value.trim();
  console.log(enteredId);

  const author = authors.find(author => author.id === enteredId);
  if (author) {
    search.json({ engine: "google_scholar_author", author_id: author.id, hl: "en" }, callback);
  } else {
    console.log("Author ID not found");
  }

  event.preventDefault();
  return false;
}


