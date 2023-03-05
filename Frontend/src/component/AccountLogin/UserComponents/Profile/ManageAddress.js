import React, { Fragment, useState } from "react";
import "./ManageAddress.css";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import {  State } from "country-state-city";
import {AiOutlineUser} from 'react-icons/ai';
import {BiCurrentLocation} from 'react-icons/bi'
import { createUserDocument } from "../../../../firebaseConfig";
import { useSelector, useDispatch } from "react-redux";
import { updateUserDetails } from "../../../../State/userData";


const ManageAddress = ({history}) => {
  
  

  const initialValue = useSelector(state => state.userdata.userDetails);
  const dispatch = useDispatch();
  const token = useSelector(state => state.userdata.token);
  const [address, setAddress] = useState(initialValue.Address);
  const [city, setCity] = useState(initialValue.City);
  const [state, setState] = useState(initialValue.State);
  const [name, setName] = useState(initialValue.Name);
  const [pinCode, setPinCode] = useState(initialValue.Pin);
  const [phoneNo, setPhoneNo] = useState(initialValue.Phone);


  const shippingSubmit = (e) => {
    e.preventDefault();

    

    

    createUserDocument(token, {address, city, state, name, pinCode, phoneNo } );


    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert("Phone Number should be 10 digits Long");
      return;
    }

    alert("Address Updated ")

    
    dispatch(updateUserDetails({
      Address : address,
      City: city,
      State: state,
      Name:  name,
      Pin: pinCode,
      Phone: phoneNo
     }));

       
   


  };
  
  
  
 const  handelGeolocation = () => {

    



         if(navigator.geolocation) 
         {

           

          navigator.geolocation.getCurrentPosition( (position) => {
          
          

          const GeolocationAPI =   `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=${position.coords.longitude},${position.coords.latitude}` 

          

          fetch(GeolocationAPI)
           .then((response) => response.json())
           .then((data) => {


              setAddress(data.address.Address);
              setCity(data.address.City);
              setPinCode(data.address.Postal);
              setState(data.address.Region);



           });


         },  (error) => {
           alert('Something went wrong, Please turn on device location')
        });
         
        }

       

         else
         {

          alert("Geolocation is not supported by your browser");

         }

     


    }

  
  

  

  return (
    <Fragment>
    

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Your Address</h2>
    
         <button className="current-location" onClick={handelGeolocation} >

          <BiCurrentLocation/> 
            Use Current Location

            </button>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >

           <div>
              <AiOutlineUser />
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

           
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry('IN').map((item) => (
                      <option key={item.isoCode} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
         

            <input
              type="submit"
              value="Save"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ManageAddress;
