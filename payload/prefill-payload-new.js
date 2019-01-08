var prefill_payload = {
  "customer_data": {
      "partner_specific_identifiers": [
          {
              "type": "TRACKING_ID",
              "value": "1001"
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
                  "partner_client_id": "AdEhkNO4a3F4J65NbHFKcZbRCiaZhVUh3chvqPMFzIDp4QmOzKiPIZwnNr_c_BHnVt_VmYgxNSbzkn5_",
                  "feature_list": [
                      "PAYMENT",
                      "REFUND"
                  ]
              }
          }
      }
  ],
  "web_experience_preference": {
      "partner_logo_url": "https://app.flowaccount.com/Content/images/logo_blue.png",
      "return_url": "http://www.amazon.com/isu",
      "use_mini_browser": true
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
}

module.exports = prefill_payload;