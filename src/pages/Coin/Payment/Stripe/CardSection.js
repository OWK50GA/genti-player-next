import React from "react";
import {
  // CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "@stripe/react-stripe-js";
import { Row, Col } from 'reactstrap'
const CARD_ELEMENT_OPTIONS = {
  // style: {
  //   base: {
  //     color: "#303238",
  //     fontSize: "16px",
  //     fontFamily: "sans-serif",
  //     fontSmoothing: "antialiased",
  //     "::placeholder": {
  //       color: "#CFD7DF"
  //     }
  //   },
  //   invalid: {
  //     color: "#e5424d",
  //     ":focus": {
  //       color: "#303238"
  //     }
  //   }
  // }
};
const inputStyle = {
  iconColor: '#000',
  color: '#000',
  fontWeight: '500',
  // fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
  fontSize: '16px',
  fontSmoothing: 'antialiased',
  ':-webkit-autofill': {
    color: '#fce883',
  },
  '::placeholder': {
    color: '#000',
  },
}


function CardSection() {
  return (
    <div className="p-3">
      <label>
        Card details
      </label>
      {/* <CardElement
      // options={CARD_ELEMENT_OPTIONS}
      /> */}
      <div className="card-input__wrapper mb-3">
        <CardNumberElement
          options={{
            style: {
              base: inputStyle,
            },
          }}
        />
      </div>
      <Row>
        <Col sm='6' md='12' >

          <div className="card-input__wrapper mb-3">

            <CardExpiryElement
              options={{
                style: {
                  base: inputStyle,
                },
              }}
            />
          </div>

        </Col>
        <Col sm='6' md='12' >
          <div className="card-input__wrapper mb-3">

            <CardCvcElement
              options={{
                style: {
                  base: inputStyle,
                },
              }}
            />
          </div>
        </Col>

      </Row>

    </div>

  );
}

export default CardSection;