import Image from "next/image";

const PropertyImages = ({ images }) => {
    console.log("Images in detail: ", images, images.length)
  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {images.length === 1 ? (
            <Image
              src={images[0]}
              alt=""
              className="object-cover h-[400px] mx-auto rounded-xl"
              width={1800}
              height={400}
              priority={true}
            />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((item, index) => (
              <div key={index} className={images.length % 2 !== 0 && index === images.length - 1 ? 'col-span-2' : 'col-span-1'}>
                <Image
                  src={item}
                  alt=""
                  className="object-cover h-[400px] w-full rounded-xl"
                  width={1800}
                  height={400}
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
