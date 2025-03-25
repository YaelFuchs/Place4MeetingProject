import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { UpdateUser,GetImageByUserId } from '../slice/userSlice'; // Replace with your action

export default function UserUpdate () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.userDetails.user);
 
  const [updateUserData, setUpdateUserData] = useState({
    id: currentUser?.id,
    userName: currentUser?.userName,
    password: '',
    email: '',
    phone: '',
    image: '', // Initial image URL
  });
  const [imageFile, setImageFile] = useState(null);
  
  useEffect(() => {
    const fetchImage = async () => {
      if (currentUser?.id) {
        try {
          const response = await dispatch(GetImageByUserId(currentUser.id));
          if(response.type.match('user/signup/fulfilled')){
           // Assuming image data is directly in the respons
          setUpdateUserData({ ...updateUserData, image: response });

          }
        } catch (error) {
          console.error('Error fetching image:', error);
          // Handle error (e.g., display an error message)
        }
      }
    };

    fetchImage();
  }, [currentUser]); // Add currentUser as a dependency
  useEffect(() => {
    if (currentUser) {
      setUpdateUserData({ ...updateUserData, id: currentUser.id });
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  
     console.log(currentUser.id);
     console.log(updateUserData);
     
      const response = await dispatch(UpdateUser({ id: currentUser.id, user :updateUserData ,imageFile  }));
      if (response.error) {
        alert(response.error.message);
      } else {
        alert("העדכון עבר בהצלחה");
        setUpdateUserData({ ...updateUserData, password: '' }); // Clear password after update
        navigate('/PersonalArea');
      }
    } catch (error) {
      alert("שגיאה לא צפויה");
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateUserData({ ...updateUserData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            שם משתמש:
            <input type="text"
              name="userName"
              value={updateUserData.userName}
              onChange={handleInputChange}
              disabled
            />
          </label>
          <label>
            סיסמה:
            <input type="password"
              name="password"
              value={updateUserData.password}
              onChange={handleInputChange}
            />
          </label>
          <label>
            אימייל:
            <input type="email"
              name="email"
              value={updateUserData.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            טלפון:
            <input type="text"
              name="phone"
              value={updateUserData.phone}
              onChange={handleInputChange}
            />
          </label>
          <label>
            תמונה:
            <input type="file"
              name="image"
              onChange={handleImageChange}
            />
          </label>
          <button type="submit">עדכן</button>
        </div>
      </form>
    </div>
  );
};
