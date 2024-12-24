import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Spinner from "./Spinner";
function Slider() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));

        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({ id: doc.id, data: doc.data() });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings");
      }
    };
    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (listings.length === 0) {
    return <></>;
  }
  return (
    listings && (
      <>
        <p className="exploreHeading">Recommended</p>
        <Swiper
          slidesPerView={2}
          pagination={{ clickable: true }}
          navigation
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          style={{ padding: "20px 0" }}
        >
          {listings.map(({ data, id, index }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
              style={{ cursor: "pointer" }}
            >
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  borderRadius: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <img
                  src={data.imgUrls[0]}
                  alt={`Listing image ${index + 1}`}
                  style={{
                    width: "300px",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
              <p
                className="swiperSlideText"
                style={{
                  marginTop: "10px",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                {data.name}
              </p>
              <p
                className="swiperSlidePrice"
                style={{
                  fontSize: "15px",
                  color: "#2d3436",
                  marginTop: "5px",
                }}
              >
                ${data.discountedPrice ?? data.regularPrice}
                {data.type === "rent" && "/ month"}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}

export default Slider;
