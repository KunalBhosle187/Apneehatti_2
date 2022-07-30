import { Carousel } from "flowbite-react";

function CarouselItem() {
  return (
    <div className=" h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <img
          src="/pictures/banner/banner-7.png"
          alt="..."
          width={100}
          height={100}
          layout="responsive"
        />
        <img
          src="/pictures/banner/banner-6.png"
          alt="..."
          width={100}
          height={100}
          layout="responsive"
        />
      </Carousel>
    </div>
  );
}

export default CarouselItem;
