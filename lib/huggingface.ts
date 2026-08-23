/**
 * Hugging Face Inference API Integration
 * Model: crownmerry/crown-humanizer-v2
 */

const HF_MODEL = "crownmerry/crown-humanizer-v2";
const HF_API_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`;

export interface HuggingFaceResponse {
  text: string;
  modelUsed: string;
  processingTime: number;
}

/**
 * Humanize text using Hugging Face model
 * @param text - The text to humanize
 * @param tone - The tone to use (optional, model may support this)
 * @returns Humanized text and metadata
 */
export async function humanizeWithHuggingFace(
  text: string,
  tone: string = "standard"
): Promise<HuggingFaceResponse> {
  const startTime = Date.now();

  if (!process.env.HF_TOKEN) {
    throw new Error("HF_TOKEN environment variable is not set");
  }

  try {
    // Prepare the prompt for the model
    const prompt = `Humanize the following text to sound natural and authentic:\n\n${text}`;

    console.log("🤗 Calling Hugging Face model:", HF_MODEL);
    console.log("📝 Input length:", text.length, "characters");

    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 2048,
          temperature: 0.7,
          top_p: 0.9,
          repetition_penalty: 1.2,
          do_sample: true,
        },
        options: {
          wait_for_model: true, // Wait if model is loading
          use_cache: false, // Get fresh results
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Hugging Face API error:", response.status, errorText);

      // Handle specific error cases
      if (response.status === 401) {
        throw new Error("Invalid Hugging Face token. Please check HF_TOKEN.");
      } else if (response.status === 503) {
        throw new Error("Model is loading. Please try again in a few seconds.");
      } else if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      } else {
        throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
      }
    }

    const result = await response.json();
    const processingTime = Date.now() - startTime;

    // Handle different response formats
    let humanizedText = "";

    if (Array.isArray(result) && result.length > 0) {
      // Response is an array (common format)
      humanizedText = result[0].generated_text || result[0].text || "";
    } else if (result.generated_text) {
      // Direct generated_text field
      humanizedText = result.generated_text;
    } else if (result[0]?.generated_text) {
      // Nested array format
      humanizedText = result[0].generated_text;
    } else {
      console.error("❌ Unexpected response format:", result);
      throw new Error("Unexpected response format from Hugging Face");
    }

    // Clean up the output - remove the original prompt if it's included
    if (humanizedText.includes(prompt)) {
      humanizedText = humanizedText.replace(prompt, "").trim();
    }

    // Remove any "Humanize the following text" instruction if model echoed it
    humanizedText = humanizedText
      .replace(/^Humanize the following text.*?:\s*/i, "")
      .trim();

    if (!humanizedText) {
      throw new Error("Model returned empty response");
    }

    console.log("✅ Hugging Face humanization successful");
    console.log("📊 Output length:", humanizedText.length, "characters");
    console.log("⏱️ Processing time:", processingTime, "ms");

    return {
      text: humanizedText,
      modelUsed: HF_MODEL,
      processingTime,
    };
  } catch (error: any) {
    console.error("❌ Hugging Face humanization failed:", error);
    throw error;
  }
}

/**
 * Test connection to Hugging Face API
 * @returns Status of the connection
 */
export async function testHuggingFaceConnection(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    if (!process.env.HF_TOKEN) {
      return {
        success: false,
        message: "HF_TOKEN not configured",
      };
    }

    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: "Test",
        parameters: { max_new_tokens: 10 },
        options: { wait_for_model: true },
      }),
    });

    if (response.ok) {
      return {
        success: true,
        message: "Connected to Hugging Face successfully",
      };
    } else {
      return {
        success: false,
        message: `Connection failed: ${response.status}`,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: `Connection error: ${error.message}`,
    };
  }
}
