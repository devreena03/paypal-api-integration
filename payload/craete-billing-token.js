var body = {
    "description": "Billing Agreement IN testing",
    "shipping_address":
    {
        "line1": "1350 North First Street",
        "city": "Chennai",
        "state": "TN",
        "postal_code": "60011",
        "country_code": "IN",
        "recipient_name": "Reena kumari"
    },
    "payer":
    {
        "payment_method": "PAYPAL"
    },
    "plan":
    {
        "type": "MERCHANT_INITIATED_BILLING",
        "merchant_preferences":
        {
            "return_url": "https://amazon.com/",
            "cancel_url": "https://amazon.com/",
            "notify_url": "https://amazon.com/",
            "accepted_pymt_type": "INSTANT",
            "skip_shipping_address": false,
            "immutable_shipping_address": true
        }
    }
}

module.exports = body;