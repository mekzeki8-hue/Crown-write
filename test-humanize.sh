#!/bin/bash

# Test script for humanization API
# Run with: bash test-humanize.sh

echo "🧪 Testing CrownWrite Humanization API"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Health Check
echo "Test 1: Health Check"
echo "--------------------"
response=$(curl -s http://localhost:3000/api/humanize)
echo "$response" | jq . 2>/dev/null || echo "$response"
echo ""

# Test 2: Standard Tone
echo "Test 2: Standard Tone (AI-sounding text)"
echo "-----------------------------------------"
curl -s -X POST http://localhost:3000/api/humanize \
  -H "Content-Type: application/json" \
  -d '{
    "text": "It is important to note that this revolutionary solution can significantly enhance your workflow. Furthermore, it should be emphasized that utilizing this groundbreaking approach will delve into the realm of unprecedented efficiency.",
    "tone": "standard"
  }' | jq . 2>/dev/null
echo ""

# Test 3: Academic Tone
echo "Test 3: Academic Tone"
echo "---------------------"
curl -s -X POST http://localhost:3000/api/humanize \
  -H "Content-Type: application/json" \
  -d '{
    "text": "The research methodology utilized in this study can be considered groundbreaking in the realm of data analysis.",
    "tone": "academic"
  }' | jq . 2>/dev/null
echo ""

# Test 4: Professional Tone
echo "Test 4: Professional Tone"
echo "-------------------------"
curl -s -X POST http://localhost:3000/api/humanize \
  -H "Content-Type: application/json" \
  -d '{
    "text": "It is imperative that we leverage this cutting-edge solution to revolutionize our business processes.",
    "tone": "professional"
  }' | jq . 2>/dev/null
echo ""

# Test 5: Ultra Mode
echo "Test 5: Ultra Mode (Maximum Humanization)"
echo "------------------------------------------"
curl -s -X POST http://localhost:3000/api/humanize \
  -H "Content-Type: application/json" \
  -d '{
    "text": "One should certainly consider that this paradigm shift may potentially unlock unprecedented opportunities.",
    "mode": "ultra"
  }' | jq . 2>/dev/null
echo ""

# Test 6: Error Handling (Empty Text)
echo "Test 6: Error Handling (Empty Text)"
echo "------------------------------------"
curl -s -X POST http://localhost:3000/api/humanize \
  -H "Content-Type: application/json" \
  -d '{"text": ""}' | jq . 2>/dev/null
echo ""

echo "========================================"
echo "✅ Testing Complete!"
echo ""
echo "Check the responses above to verify:"
echo "- Health check shows 'configured'"
echo "- Humanized text removes AI words"
echo "- No em dashes (—) in output"
echo "- Natural, conversational language"
echo "- Error handling works"
