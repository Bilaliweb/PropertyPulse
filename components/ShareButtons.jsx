"use client";
import { XIcon } from "react-share";
import { XShareButton } from "react-share";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailIcon,
  EmailShareButton,
} from "react-share";

const ShareButtons = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <div>
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Property:
      </h3>
      <div className="flex gap-3 justify-center pb-5 ">
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type.replace(/\s/g, "")}For Rent`}
        >
          <FacebookIcon size={30} round={true} />
        </FacebookShareButton>
        <XShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[`#${property.type.replace(/\s/g, "")}For Rent`]}
        >
          <XIcon size={30} round={true} />
        </XShareButton>
        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator={'::'}
        >
          <WhatsappIcon size={30} round={true} />
        </WhatsappShareButton>
        <EmailShareButton
          url={shareUrl}
          subject ={property.name}
          body={`Check out this property listing: ${shareUrl}`}
        >
          <EmailIcon size={30} round={true} />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default ShareButtons;
