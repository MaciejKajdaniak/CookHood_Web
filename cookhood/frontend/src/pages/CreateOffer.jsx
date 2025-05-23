import React from 'react';
import Navbar from '../components/Shared/Navbar.jsx';
import OfferForm from '../components/Offers/OfferForm.jsx';


function CreateOffer(){
    return(
        <div>
            <Navbar />
            <h2>Dodaj ofertę</h2>
            <OfferForm/>
        </div>
    );
}

export default CreateOffer;