import Link from "next/link";

const InfoBox = ({ heading, backgroundColor, textColor, description, buttonObject }) => {
  return (
    <>
      <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
        <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
        <p className="mt-2 mb-4">
          {/* Find your dream rental property. Bookmark properties and contact
          owners. */}
          {description}
        </p>
        <Link
          href={buttonObject.route}
          className={`inline-block ${buttonObject.bgColor} text-white rounded-lg px-4 py-2 hover:${buttonObject.hoverColor}`}
        >
          {/* Browse Properties */}
          {buttonObject.btnName}
        </Link>
      </div>
    </>
  );
};

export default InfoBox;
