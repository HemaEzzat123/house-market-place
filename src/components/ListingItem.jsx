import { Link } from "react-router-dom";
import DeleteIcon from "../assets/svg/deleteIcon.svg?react";
import EditIcon from "../assets/svg/editIcon.svg?react";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";
function ListingItem({ listing, id, onEdit, onDelete }) {
  return (
    <li className="categoryListing">
      <Link
        to={`/category/${listing.type}/${id}`}
        className="categoryListingLink"
      >
        <img
          src={listing.imgUrls[0]}
          alt={listing.name}
          className="categoryListingImg"
        />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingName">{listing.name}</p>
          <p className="categoryListingPrice">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            {listing.type === "rent" && " / Month"}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="bed" className="categoryListingIcon" />
            <p className="categoryListingInfoText">
              {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : "1 Bed"}
            </p>
            <img src={bathtubIcon} alt="bath" className="categoryListingIcon" />
            <p className="categoryListingInfoText">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : "1 Bath"}
            </p>
          </div>
        </div>
      </Link>
      {onDelete && (
        <DeleteIcon
          className="removeIcon"
          fill="rgb(231,76,60)"
          onClick={() => onDelete(listing.id, listing.name)}
        />
      )}
      {onEdit && (
        <EditIcon
          fill="#00cc66"
          className="editIcon"
          onClick={() => onEdit(id)}
        />
      )}
    </li>
  );
}

export default ListingItem;