import React, { useState, useEffect } from 'react';
import { Container, Badge, Spinner } from 'react-bootstrap';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const VendorProfile = () => {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  const fallbackImage = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop";

  useEffect(() => {
    const fetchVendor = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists() && docSnap.data().role === 'vendor') {
            setVendor(docSnap.data());
          } else {
            console.warn("Vendor profile not found or not a vendor.");
          }
          setLoading(false);
        }
      });
    };

    fetchVendor();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="danger" />
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="text-center mt-5">
        <h3>No vendor profile found.</h3>
        <p>Please make sure you're logged in as a vendor and profile data exists in Firestore.</p>
      </div>
    );
  }

  const {
    name,
    cuisine,
    rating,
    location,
    hours,
    description,
    image
  } = vendor;

  return (
    <>
      <style>
        {`
          .vendor-profile {
            padding: 3rem 2rem;
            background: linear-gradient(135deg, #fdf2f8, #fce7f3);
            min-height: 100vh;
            font-family: 'Poppins', sans-serif;
            box-sizing: border-box;
          }

          .profile-container {
            display: flex;
            align-items: center;
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            padding: 2rem;
            margin-top: 8rem;
            background: #ffffff;
            border-radius: 20px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
            gap: 3rem;
            box-sizing: border-box;
          }

          .profile-image {
            border-radius: 20px;
            width: 45%;
            height: auto;
            object-fit: cover;
            flex-shrink: 0;
            box-shadow: 0 4px 15px rgba(198, 115, 146, 0.3);
          }

          .profile-content {
            flex: 1;
            padding: 0.5rem 0;
          }

          .profile-title {
            font-family: 'Montserrat', sans-serif;
            font-weight: 800;
            font-size: 2.5rem;
            color: #6b2c4a;
            margin-bottom: 1rem;
          }

          .profile-cuisine {
            font-size: 1.2rem;
            color: #d81e69;
            margin-bottom: 1rem;
          }

          .profile-rating {
            font-size: 1.5rem;
            color: #ec4899;
            margin-bottom: 1rem;
          }

          .profile-details {
            margin-bottom: 1.5rem;
          }

          .profile-location,
          .profile-hours {
            font-size: 1rem;
            color: #7e2a52;
            margin-bottom: 0.5rem;
          }

          .profile-description {
            font-size: 1rem;
            color: #a85b7a;
            line-height: 1.5;
          }

          .badge {
            margin-right: 0.5rem;
            font-weight: 600;
          }

          @media (max-width: 768px) {
            .profile-container {
              flex-direction: column;
              padding: 1rem;
            }
            .profile-image {
              width: 100%;
              margin-bottom: 1.5rem;
              border-radius: 15px;
            }
            .profile-title {
              font-size: 2rem;
            }
          }
        `}
      </style>

      <div className="vendor-profile">
        <Container>
          <div className="profile-container">
            <img
              src={image || fallbackImage}
              alt={name}
              className="profile-image"
            />
            <div className="profile-content">
              <h1 className="profile-title">{name || "Restaurant Name"}</h1>
              <div className="profile-cuisine">
                <Badge bg="light" text="dark">
                  {cuisine || "Cuisine"} Cuisine
                </Badge>
              </div>
              <div className="profile-rating">⭐ {rating || "4.0"}</div>
              <div className="profile-details">
                <div className="profile-location">📍 {location || "Not Provided"}</div>
                <div className="profile-hours">🕒 {hours || "Hours not set"}</div>
              </div>
              <div className="profile-description">
                {description || "No description available."}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default VendorProfile;
