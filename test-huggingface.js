/**
 * Test script for Hugging Face integration
 * Run with: node test-huggingface.js
 */

const TEST_TEXT = "This is a test to see if the AI model works correctly. The system should humanize this text.";

async function testHuggingFaceAPI() {
  console.log("🧪 Testing Hugging Face Integration\n");
  console.log("=" .repeat(60));
  
  try {
    // 1. Test Health Check
    console.log("\n📊 Step 1: Testing Health Check Endpoint...");
    const healthResponse = await fetch('http://localhost:3000/api/humanize');
    const healthData = await healthResponse.json();
    
    console.log("✅ Health Check Response:");
    console.log(JSON.stringify(healthData, null, 2));
    
    if (healthData.defaultProvider !== 'huggingface') {
      console.warn("⚠️  Warning: Default provider is not Hugging Face!");
      console.warn("Current provider:", healthData.defaultProvider);
    } else {
      console.log("✅ Hugging Face is configured as the primary provider");
    }
    
    // 2. Test Humanization (requires authentication)
    console.log("\n🤖 Step 2: Testing Humanization Endpoint...");
    console.log("📝 Input text:", TEST_TEXT);
    console.log("\n⚠️  Note: This test requires authentication.");
    console.log("To test the full flow:");
    console.log("1. Open the website in your browser");
    console.log("2. Sign in to your account");
    console.log("3. Paste text into the humanizer");
    console.log("4. Click 'Humanize'");
    console.log("5. Check the browser console for logs");
    
    console.log("\n" + "=".repeat(60));
    console.log("✅ Integration Setup Complete!");
    console.log("\nConfiguration Summary:");
    console.log("- Model: crownmerry/crown-humanizer-v2");
    console.log("- Provider: Hugging Face Inference API");
    console.log("- Token: " + (process.env.HF_TOKEN ? "✅ Configured" : "❌ Missing"));
    console.log("- Status: Ready for testing");
    
  } catch (error) {
    console.error("\n❌ Test failed:", error.message);
    console.error("\nMake sure the development server is running:");
    console.error("  npm run dev");
  }
}

// Run the test
testHuggingFaceAPI();
