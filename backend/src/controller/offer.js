import express from "express";
import cors from "cors";
import { offerDAO } from "../database/OfferDAO.js";
import { sellerDAO } from "../database/SellerDAO.js";
import { productDAO } from "../database/ProductDAO.js";
import { printing } from "../services/Printing.js";
export const offerRouter = express.Router();

offerRouter.use(express.json());
offerRouter.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

offerRouter.get("/offer", (req, res) => {
  offerDAO
    .findOffer(req.query.operator, req.query.parameter)
    .then((offer) => {
      res.send(offer);
    });
});

offerRouter.get("/allOffers", (req, res) => {
  offerDAO.findAllOffers().then((offer) => {
    res.send(offer);
  });
});

offerRouter.post("/offer", async (req, res) => {
  try {
    console.log(req.body);
    const p = req.body.product;
    const s = req.body.seller;
    const sell = await sellerDAO.insertSeller(
      s.seller_name,
      s.seller_firstname,
      s.seller_email,
      s.seller_phone
    );

    let offer = [];
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

offerRouter.put("/PrintAllOffers", (req, res) => {
  printing.printOffers(req.body.offers);
});

offerRouter.delete("/offer", (req, res) => {
  offerDAO
    .deleteOffer(req.query.operator, req.query.parameter)
    .then((offer) => {
      res.send(offer);
    });
});

offerRouter.put("/offer", (req, res) => {
  offerDAO
    .updateOffer(req.query.operator, req.query.parameter, req.body)
    .then((offer) => {
      res.send(offer);
    });
});
// let prod=dbConnection.insertProduct(req.body.product)
//     let sell=dbConnection.insertSeller(req.body.seller)
//     dbConnection.insertOffer(prod.product_id, sell.seller_id).then
//     (offer => { res.send(offer) })
