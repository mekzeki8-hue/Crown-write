#!/bin/bash

# Test Polar Webhook Locally
# This script simulates a Polar webhook call to test credit addition

echo "🧪 Testing Polar Webhook Locally..."
echo ""

# Get webhook secret from .env.local
WEBHOOK_SECRET=$(grep POLAR_WEBHOOK_SECRET .env.local | cut -d '=' -f2)

if [ -z "$WEBHOOK_SECRET" ]; then
  echo "❌ Error: POLAR_WEBHOOK_SECRET not found in .env.local"
  exit 1
fi

# Sample checkout.updated payload
PAYLOAD='{
  "type": "checkout.updated",
  "data": {
    "id": "test_checkout_123",
    "status": "succeeded",
    "product_id": "c437f55e-c1fa-4ca3-8fcf-7aa2ccde907e",
    "customer_email": "test@example.com",
    "metadata": {
      "userId": "user_test_123",
      "source": "crownwrite_web"
    }
  }
}'

# Calculate HMAC signature
SIGNATURE=$(echo -n "$PAYLOAD" | openssl dgst -sha256 -hmac "$WEBHOOK_SECRET" | sed 's/^.* //')

echo "📤 Sending webhook to http://localhost:3000/api/webhooks/polar"
echo "   Signature: $SIGNATURE"
echo ""

# Send webhook request
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/api/webhooks/polar \
  -H "Content-Type: application/json" \
  -H "polar-signature: $SIGNATURE" \
  -d "$PAYLOAD")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo "📥 Response:"
echo "   Status: $HTTP_CODE"
echo "   Body: $BODY"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ Webhook test successful!"
  echo ""
  echo "💡 Next steps:"
  echo "   1. Check your server logs for 'Received Polar webhook: checkout.updated'"
  echo "   2. Verify credits were added: '✅ Added 10000 credits to user user_test_123'"
  echo "   3. Query database: SELECT * FROM users WHERE clerk_id = 'user_test_123';"
else
  echo "❌ Webhook test failed!"
  echo "   Check your server logs for errors"
fi
