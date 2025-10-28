import "./styles.css";
import ReactDOM from "react-dom/client";
import React from "react";
const images = [
  {
    title: "Book 1",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMKj83FrUFU_vZlDO9Ncx0Opbw649p9EU4Pg&s",
    price: 432,
  },
  {
    title: "Book 2",
    imageURL:
      "https://vkpublications.com/cdn/shop/files/10-physics.jpg?v=1737447024&width=750",
    price: 422,
  },
  {
    title: "Book 3",
    imageURL:
      "https://www.wileyindia.com/pub/media/catalog/product/cache/20f980a1f90e8cec7a3c8f2cf40a32a8/9/7/9788126556021.jpg",
    price: 411,
  },
];

// function Book({ title, imageURL, price }) {
//   const image = React.createElement("img", {
//     src: imageURL,
//     width: 250,
//     height: 250,
//     alt: "Physics Book Image",
//   });

//   const h4 = React.createElement("h4", null, `Title: ${title}`);
//   const h3 = React.createElement("h3", null, `Price: ₹${price}`);
//   const bt = React.createElement("button", null, "Add To Cart");

//   return React.createElement("div", { className: "card" }, image, h4, h3, bt);
// }

function App() {
  return (
    <div className="book-list">
      {images.map((book, index) => (
        <div key={index} className="card">
          <img src={book.imageURL} alt="book_image" />
          <h3>Title:{book.title}</h3>
          <h4>Price:₹{book.price}</h4>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));