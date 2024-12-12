// import React from 'react'

// function Carousel() {
//   return (
//     <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{}}>
//   <div className="carousel-inner" id='carousel'>
//     <div className='carousel-caption' style={{zIndex:"10"}}>
//   <form className="d-flex">
//     <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
//     <button className="btn btn-outline-success bg-success text-white my-2 my-sm-0" type="submit">Search</button>
//   </form>
//   </div>
//     <div className="carousel-item active">
//       <img src="https://media.istockphoto.com/id/1065282252/photo/close-up-of-hamburger-on-white-plate.jpg?s=1024x1024&w=is&k=20&c=-psje5MvmKQq-v6AW6lpjaMOVfxcEFN3gTqGxwnyFu4=" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
//     </div>
//     <div className="carousel-item">
//       <img src="https://media.istockphoto.com/id/1292635321/photo/veg-steam-momo-nepalese-traditional-dish-momo-stuffed-with-vegetables-and-then-cooked-and.jpg?s=2048x2048&w=is&k=20&c=QSdFsj2yVDX7wmQ9H3ku0Gtg30FX9M42IOhaGi3hvT4=" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
//     </div>
//     <div className="carousel-item">
//       <img src="https://media.istockphoto.com/id/153444470/photo/pizza.jpg?s=1024x1024&w=is&k=20&c=TYRIpKiWvR0aKKBspWjesTaI-H71F8Gdd1dH5kE_qao=" className="d-block w-100"style={{filter:"brightness(30%)"}} alt="..."/>
//     </div>
//   </div>
//   <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
//     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//     <span className="visually-hidden">Previous</span>
//   </button>
//   <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
//     <span className="carousel-control-next-icon" aria-hidden="true"></span>
//     <span className="visually-hidden">Next</span>
//   </button>
// </div>
//   )
// }

// export default Carousel
import React from 'react';
import './Carousel.css'; // Optional: If you have custom CSS for the carousel


function Carousel() {
  return (
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner" id="carousel">
        <div className="carousel-item active">
          <img
            src="https://media.istockphoto.com/id/1065282252/photo/close-up-of-hamburger-on-white-plate.jpg?s=1024x1024&w=is&k=20&c=-psje5MvmKQq-v6AW6lpjaMOVfxcEFN3gTqGxwnyFu4="
            className="d-block w-100 carousel-image"
            alt="Hamburger"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://media.istockphoto.com/id/1292635321/photo/veg-steam-momo-nepalese-traditional-dish-momo-stuffed-with-vegetables-and-then-cooked-and.jpg?s=2048x2048&w=is&k=20&c=QSdFsj2yVDX7wmQ9H3ku0Gtg30FX9M42IOhaGi3hvT4="
            className="d-block w-100 carousel-image"
            alt="Veg Momo"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://media.istockphoto.com/id/153444470/photo/pizza.jpg?s=1024x1024&w=is&k=20&c=TYRIpKiWvR0aKKBspWjesTaI-H71F8Gdd1dH5kE_qao="
            className="d-block w-100 carousel-image"
            alt="Pizza"
          />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
      <div className='carousel-caption' style={{ zIndex: "10" }}>
        <form className="d-flex">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success bg-success text-white my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </div>
  );
}

export default Carousel;
