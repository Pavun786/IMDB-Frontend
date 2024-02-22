
import { useState } from "react";
import Image1 from "./bannerImages/Image1.jpg";
import Image2 from "./bannerImages/Image2.jpg";
import Image3 from "./bannerImages/Image3.jpg";
import Image6 from "./bannerImages/Image6.jpg";
import Image5 from "./bannerImages/Image5.jpg";

function SlideShow() {


  return (
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
          <img src={Image5} class="d-block w-100" alt="BannerImage"/>
      </div>
      <div class="carousel-item">
        <img src={Image6} class="d-block w-100" alt="BannerImage"/>
      </div>
      <div class="carousel-item">
        <img src={Image5} class="d-block w-100" alt="BannerImage"/>
      </div>
    </div>
  </div>
  );
}

export default SlideShow;
