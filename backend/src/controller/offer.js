import express from "express";
import cors from "cors";
import { offerDAO } from "../database/operations/OfferDAO.js";
import { sellerDAO } from "../database/operations/SellerDAO.js";
import { productDAO } from "../database/operations/ProductDAO.js";
import { printing } from "../services/Printing.js";
export const offerRouter = express.Router();

//security stuff
offerRouter.use(express.json());
offerRouter.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

//route to get offer by an operator and a parameter
offerRouter.get("/offer", (req, res) => {
  offerDAO
    .findOffer(req.query.operator, req.query.parameter)
    .then((offer) => {
      res.send(offer);
    });
});

//route to get all offers
offerRouter.get("/allOffers", (req, res) => {
  offerDAO.findAllOffers().then((offer) => {
    res.send(offer);
  });
});

//route to create a new offer entry and new product and seller entry to get the foreign keys
offerRouter.post("/offer", async (req, res) => {
  try {
    console.log(req.body);
    const p = req.body.product;
    const s = req.body.seller;
    //inserts seller in db
    const sell = await sellerDAO.insertSeller(
      s.seller_name,
      s.seller_firstname,
      s.seller_email,
      s.seller_phone
    );

    let offer = [];
    //maps over product array and inserts every product in db
    //then inserts offer with the product_id and seller_id
    await p.map(async (product) => {
      const prod = await productDAO.insertProduct(
        product.product_name,
        product.product_price,
        product.product_category
      );
      const off = await offerDAO.insertOffer(
        prod.product_id,
        sell.seller_id
      );
      console.log(off);
      offer.push({ off });
    });
    //TODO: hier den offer-array zum printen nehmen
    res.json(offer);
    //TODO: es wird immer null gesendet nie fehlermeldung
  } catch (error) {
    res.json(error.message);
  }
});

//route to print all offers
offerRouter.put("/PrintAllOffers", (req, res) => {
  printing.printOffers(req.body.offers);
});

//route to delete offer by an operator and a parameter
offerRouter.delete("/offer", (req, res) => {
  offerDAO
    .deleteOffer(req.query.operator, req.query.parameter)
    .then((offer) => {
      res.send(offer);
    });
});

//route to update offer by an operator and a parameter
offerRouter.put("/offer", (req, res) => {
  offerDAO
    .updateOffer(req.query.operator, req.query.parameter, req.body)
    .then((offer) => {
      res.send(offer);
    });
});
