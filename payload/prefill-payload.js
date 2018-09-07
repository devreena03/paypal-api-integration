var prefill_payload = {
    "customer_data": {
      "customer_type": "MERCHANT",
      "person_details": {
        "email_address": "india-isu7@test.com",
        "name": {
          "prefix": "Mrs.",
          "given_name": "Reena",
          "surname": "Singh"
         
        },
        "date_of_birth": {
          "event_type": "BIRTH",
          "event_date": "1990-01-01T23:59:59.999Z"
        },
        "nationality_country_code": "IN"
      },
      "business_details": {
        "phone_contacts": [
          {
            "phone_number_details": {
              "country_code": "91",
              "national_number": "9122287333"
            },
            "phone_type": "FAX"
          }
        ],
        "business_address": {
          "line1": "12, ABC complex",
          "line2": "M.G. Road",
          "city": "Bangalore",
          "state": "Karnataka",
          "country_code": "IN",
          "postal_code": "506103"
        },
        "business_type": "CORPORATION",
        "category": "1012",
        "sub_category": "2132",
        "purpose_code": "P0104",
        "names": [
          {
            "type": "LEGAL",
            "name": "Amazing Flower Shop"
          }
        ],
        "event_dates": [
          {
            "event_type": "ESTABLISHED",
            "event_date": "2009-01-31T13:59:45Z"
          }
        ],
        "website_urls": [
          "http://flower.amaze.wow"
        ],
        "identity_documents": [
          {
            "type": "PAN",
            "value": "AUYBE1234R",
            "partial_value": false,
            "issuer_country_code": "IN"
          }
        ],
        "email_contacts": [
          {
            "email_address": "customercare@brazilstore.br",
            "role": "CUSTOMER_SERVICE"
          }
        ],
        "country_of_incorporation": "IN"
      },
      "financial_instrument_data": {
        
      },
      "preferred_language_code": "en_US",
      "primary_currency_code": "INR",
      "referral_user_payer_id": {
        "type": "PAYER_ID",
        "value": "VUMVKBYF5EVNC"
      },
      "partner_specific_identifiers": [
        {
          "type": "TRACKING_ID",
          "value": "1010"
        }
      ]
    },
    "requested_capabilities": [
      {
        "capability": "API_INTEGRATION",
        "api_integration_preference": {
            "partner_id": "VUMVKBYF5EVNC",
            "rest_api_integration": {
                "integration_method": "PAYPAL",
                "integration_type": "THIRD_PARTY"
            },
            "rest_third_party_details": {
                "partner_client_id":"partner_client_id",
                "feature_list": [
                    "PAYMENT",
                    "REFUND",
                    "SWEEP_FUNDS_EXTERNAL_SINK",
                    "DELAY_FUNDS_DISBURSEMENT",
                    "PARTNER_FEE",
                    "ADVANCED_TRANSACTIONS_SEARCH",
                    "READ_SELLER_DISPUTE",
                    "UPDATE_SELLER_DISPUTE"
                ]
            }
        }
      }
    ],
    "web_experience_preference": {
      "partner_logo_url": "http:\/\/leiphone.qiniudn.com\/uploads\/2014\/05\/Paypal.jpg",
      "return_url": "http://localhost:8080/api/partner/success",
      "action_renewal_url": "http:\/\/paypalpartner.com\/renew-prefill-url"
    },
    "collected_consents": [
      {
        "type": "SHARE_DATA_CONSENT",
        "granted": true
      }
    ],
    "products": [
      "EXPRESS_CHECKOUT"
    ]
  };


module.exports = prefill_payload;