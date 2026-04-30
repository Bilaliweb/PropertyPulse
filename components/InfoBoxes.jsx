import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading={"For Renters"}
            backgroundColor={'bg-gray-100'}
            textColor={'black'}
            description={
              "Find your dream rental property. Bookmark properties and contact owners."
            }
            buttonObject={{
              route: "/properties",
              bgColor: "bg-black",
              btnName: "Browse Properties",
              hoverColor: "bg-gray-700",
            }}
          />

          <InfoBox
            heading={"For Property Owners"}
            backgroundColor={'bg-blue-100'}
            textColor={'black'}
            description={
              "List your properties and reach potential tenants. Rent as an airbnb or long term."
            }
            buttonObject={{
              route: "/properties/add",
              bgColor: "bg-blue-500",
              btnName: "Add Property",
              hoverColor: "bg-blue-600",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
