import { useRef, useEffect, useState } from "react";
import { UilEnter } from "@iconscout/react-unicons";
import ButtonSmallJustIcon from "@/components/buttons/ButtonSmallJustIcon";

const SellerSearchBar = ({ allSellers, setClickedSellerID, setName }) => {
  const [searchedSeller, setSearchedSeller] = useState([]);

  // search seller
  const searchSeller = () => {
    const searchBar = document.getElementById("sellerSearchBar");
    const searchString = searchBar.value.toLowerCase();
    let tmpSearchedSeller = [];

    console.log("search string: ", searchString);
    console.log("all sellers: ", allSellers);
    if (searchString !== "") {
      allSellers.map((seller) => {
        if (
          seller.seller_name.toLowerCase().includes(searchString) ||
          seller.seller_firstname.toLowerCase().includes(searchString)
        ) {
          tmpSearchedSeller.push(seller);
        }
      });
    }
    //only show 5 sellers max
    setSearchedSeller(tmpSearchedSeller.slice(0, 5));
  };

  // set clicked seller id
  const handleSellerClick = (seller) => {
    console.log("seller clicked: ", seller);
    setClickedSellerID(seller.seller_id);
    let firstName = seller.seller_name;
    let lastName = seller.seller_firstname;
    let wholeName = firstName + " " + lastName;
    setName(wholeName);
    setSearchedSeller([]);
  };

  return (
    <>
      <input
        type="text"
        onChange={searchSeller}
        className="w-full mt-2 rounded border border-ourLightGray py-2 px-4 text-ourSuperDarkGray placeholder:text-ourGray focus:outline-ourPrimaryColor"
        id="sellerSearchBar"
        placeholder="Verkäufer suchen..."
      />
      <div>
        {searchedSeller.map((seller) => (
          <div
            key={seller.id}
            onClick={() => handleSellerClick(seller)}
            className="px-4 py-2 rounded cursor-pointer bg-white border-b border-l border-r w-full border-ourLightGray hover:text-ourPrimaryColorHover"
          >
            <p className="text-sm">
              {seller.seller_name} {seller.seller_firstname}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SellerSearchBar;
