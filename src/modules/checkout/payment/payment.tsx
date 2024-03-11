// CreditCardForm.tsx
import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./payment.scss"; // Styling
import { Button, Tooltip } from "@mui/material";

const CreditCardForm = (props: { paySuccessFul: () => void }) => {
  const [formData, setFormData] = useState<any>({
    cvv: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleExpDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedValue = value
      .replace(/\D/g, "") // Remove non-numeric characters
      .slice(0, 4) // Keep only the first 4 characters
      .replace(/(\d{2})(\d{0,2})/, "$1/$2"); // Add '/' after the second character

    // Update input value
    e.target.value = formattedValue;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="credit-card-form">
      <div className="card-preview">
        <Cards
          cvc={formData.cvv}
          expiry={formData.expiry}
          focused={formData.focus}
          name={formData.name}
          number={formData.number}
        />
      </div>
      <form className="form">
        <input
          className="inputBar"
          type="tel"
          pattern="\d{4}\s\d{4}\s\d{4}\s\d{4}"
          maxLength={16}
          name="number"
          placeholder="Card Number"
          onChange={handleChange}
          onFocus={(e) => setFormData({ ...formData, focus: e.target.name })}
        />
        <input
          className="inputBar"
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          onFocus={(e) => setFormData({ ...formData, focus: e.target.name })}
        />
        <div className="twoI">
          <input
            className="small"
            type="text"
            name="expiry"
            pattern="\d{2}/\d{2}"
            placeholder="MM/YY"
            maxLength={5}
            onChange={handleExpDateChange}
            onFocus={(e) => setFormData({ ...formData, focus: e.target.name })}
          />
          <input
            className="small"
            type="tel"
            name="cvv"
            placeholder="CVV"
            maxLength={3}
            onChange={handleChange}
            onFocus={(e) => setFormData({ ...formData, focus: e.target.name })}
          />
        </div>
        {formData.number.length !== 16 ||
        !formData.name ||
        !formData.expiry ||
        formData.cvv.length !== 3 ? (
          <Tooltip title="Details are not valid!">
            <Button variant="contained" size="small" className="payBtnD">
              Pay
            </Button>
          </Tooltip>
        ) : (
          <Button
            variant="contained"
            size="small"
            className="payBtn"
            onClick={props.paySuccessFul}
          >
            Pay
          </Button>
        )}
      </form>
    </div>
  );
};

export default CreditCardForm;
