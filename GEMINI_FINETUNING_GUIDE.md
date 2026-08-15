# 🚀 Google Cloud Gemini Fine-Tuning Setup Guide

**Training File:** `/Users/mac/Desktop/true/Crownwrite/Data/training_data_gemini.jsonl`  
**Total Examples:** 715  
**Status:** Ready for fine-tuning

---

## 1️⃣ Required Google Cloud Services/APIs

You need to enable these APIs in your Google Cloud project:

### Required APIs:
```
✓ Vertex AI API
✓ Cloud Storage API
✓ Generative AI API
✓ Cloud Resource Manager API
```

### How to Enable:
**Option A: Via Google Cloud Console**
1. Go to: https://console.cloud.google.com/apis/library
2. Search for each API
3. Click "Enable"

**Option B: Via gcloud CLI**
```bash
gcloud services enable aiplatform.googleapis.com
gcloud services enable storage-api.googleapis.com
gcloud services enable generativelanguage.googleapis.com
gcloud services enable cloudresourcemanager.googleapis.com
```

---

## 2️⃣ Google Cloud Project & Billing Requirements

### ✅ YES, You Need Both:

**Google Cloud Project:**
- Required: YES
- Purpose: Container for all your GCP resources
- Create at: https://console.cloud.google.com/projectcreate

**Billing Account:**
- Required: YES (fine-tuning is a paid service)
- Purpose: To pay for fine-tuning compute and storage
- Link billing: https://console.cloud.google.com/billing

### ⚠️ Estimated Costs:
Based on 715 examples with Gemini 1.5 Flash:
- **Training cost:** ~$10-30 (depends on epochs, model size)
- **Storage cost:** ~$0.026/month for 5.6 MB file
- **Inference cost:** Pay-per-use when calling tuned model

**Note:** Costs are approximate. Check current pricing at:
https://cloud.google.com/vertex-ai/generative-ai/pricing

### Free Tier:
- Google Cloud offers $300 free credits for new users (90 days)
- Can be used for fine-tuning
- Sign up: https://cloud.google.com/free

---

## 3️⃣ Create Cloud Storage Bucket

### Prerequisites:
- Google Cloud project created
- Cloud Storage API enabled
- gcloud CLI installed (or use Console)

### Option A: Via gcloud CLI (Recommended)

```bash
# Set your project ID
export PROJECT_ID="your-project-id"
gcloud config set project $PROJECT_ID

# Create bucket in us-central1 (required for Gemini training)
export BUCKET_NAME="crownwrite-training-data"
gsutil mb -l us-central1 gs://${BUCKET_NAME}

# Verify bucket created
gsutil ls
```

### Option B: Via Google Cloud Console

1. Go to: https://console.cloud.google.com/storage
2. Click "Create Bucket"
3. **Bucket name:** `crownwrite-training-data` (must be globally unique)
4. **Location type:** Region
5. **Location:** `us-central1` (REQUIRED for Gemini)
6. **Storage class:** Standard
7. **Access control:** Uniform
8. Click "Create"

### Important Notes:
- ⚠️ **Location must be `us-central1`** for Gemini fine-tuning
- Bucket name must be globally unique
- Use lowercase, hyphens only

---

## 4️⃣ Upload Training Data to Cloud Storage

### Option A: Via gsutil (Recommended)

```bash
# Set variables
export BUCKET_NAME="crownwrite-training-data"
export LOCAL_FILE="/Users/mac/Desktop/true/Crownwrite/Data/training_data_gemini.jsonl"
export GCS_PATH="gs://${BUCKET_NAME}/training_data_gemini.jsonl"

# Upload file
gsutil cp $LOCAL_FILE $GCS_PATH

# Verify upload
gsutil ls -lh gs://${BUCKET_NAME}/

# Check file details
gsutil stat $GCS_PATH
```

### Option B: Via Google Cloud Console

1. Go to: https://console.cloud.google.com/storage
2. Click on your bucket name
3. Click "Upload Files"
4. Select: `/Users/mac/Desktop/true/Crownwrite/Data/training_data_gemini.jsonl`
5. Wait for upload to complete
6. Verify file appears in bucket

### Verification:
Your file should be accessible at:
```
gs://crownwrite-training-data/training_data_gemini.jsonl
```

---

## 5️⃣ Recommended Gemini Model for Text Humanizer

### ✅ Best Choice: **Gemini 1.5 Flash**

**Model ID:** `gemini-1.5-flash-002`

**Why This Model:**
- ✓ **Optimized for text tasks** (perfect for humanization)
- ✓ **Fast inference** (low latency for production)
- ✓ **Cost-effective** (lower training and inference costs)
- ✓ **Supports supervised fine-tuning**
- ✓ **128k context window** (handles long documents)
- ✓ **Good quality-to-cost ratio**

### Alternative Options:

**Option 2: Gemini 1.5 Pro** (if you need higher quality)
- Model ID: `gemini-1.5-pro-002`
- Higher quality but more expensive
- Slower inference
- Use if Flash quality isn't sufficient

**NOT Recommended:**
- ❌ Gemini 1.0 models (older, being phased out)
- ❌ Ultra models (overkill for text humanization)

### Recommendation:
**Start with Gemini 1.5 Flash.** You can always fine-tune Pro later if needed.

---

## 6️⃣ Training & Validation Dataset Split

### Recommended Split: **90/10**

With 715 examples:
- **Training set:** 643 examples (~90%)
- **Validation set:** 72 examples (~10%)

### Why This Split:
- ✓ Sufficient training data (600+ examples)
- ✓ Adequate validation for monitoring
- ✓ Standard practice for datasets of this size
- ✓ Prevents overfitting

### How to Split:

**Option A: Let Vertex AI Handle It**
- Upload full file (715 examples)
- Vertex AI can auto-split for you
- Specify validation percentage in training config

**Option B: Manual Split** (More Control)

```python
import json
import random

# Read all examples
with open('/Users/mac/Desktop/true/Crownwrite/Data/training_data_gemini.jsonl', 'r') as f:
    examples = [json.loads(line) for line in f]

# Shuffle and split
random.seed(42)  # For reproducibility
random.shuffle(examples)

split_idx = int(len(examples) * 0.9)
train_examples = examples[:split_idx]  # 643
val_examples = examples[split_idx:]     # 72

# Save training set
with open('training_set.jsonl', 'w') as f:
    for ex in train_examples:
        f.write(json.dumps(ex, ensure_ascii=False) + '\n')

# Save validation set
with open('validation_set.jsonl', 'w') as f:
    for ex in val_examples:
        f.write(json.dumps(ex, ensure_ascii=False) + '\n')

print(f"Training: {len(train_examples)} examples")
print(f"Validation: {len(val_examples)} examples")
```

### Recommendation:
**Use Option A** (single file, let Vertex AI split) for simplicity.

---

## 7️⃣ Fine-Tuning Command (DO NOT RUN)

### Prerequisites Checklist:
- [ ] Google Cloud project created
- [ ] Billing enabled
- [ ] Required APIs enabled
- [ ] Cloud Storage bucket created in us-central1
- [ ] Training data uploaded to bucket
- [ ] gcloud CLI installed and authenticated

### Method 1: Via gcloud CLI

```bash
# Set variables
export PROJECT_ID="your-project-id"
export REGION="us-central1"
export DISPLAY_NAME="crownwrite-humanizer-v1"
export MODEL_ID="gemini-1.5-flash-002"
export TRAINING_DATA="gs://crownwrite-training-data/training_data_gemini.jsonl"

# Authenticate
gcloud auth login
gcloud config set project $PROJECT_ID

# Start fine-tuning job (DO NOT RUN YET)
gcloud ai models tuning tune \
  --region=$REGION \
  --display-name=$DISPLAY_NAME \
  --source-model=$MODEL_ID \
  --training-dataset-uri=$TRAINING_DATA \
  --validation-dataset-uri=$TRAINING_DATA \
  --validation-dataset-split=0.1 \
  --epochs=4 \
  --learning-rate=0.001 \
  --adapter-size=16
```

### Method 2: Via Python SDK

```python
# Install: pip install google-cloud-aiplatform

from google.cloud import aiplatform

# Initialize
aiplatform.init(
    project="your-project-id",
    location="us-central1"
)

# Configure tuning job (DO NOT RUN YET)
tuning_job = aiplatform.TuningJob.create(
    base_model="gemini-1.5-flash-002",
    tuned_model_display_name="crownwrite-humanizer-v1",
    training_dataset="gs://crownwrite-training-data/training_data_gemini.jsonl",
    validation_dataset="gs://crownwrite-training-data/training_data_gemini.jsonl",
    tuning_parameters={
        "epochs": 4,
        "learning_rate": 0.001,
        "adapter_size": 16,
    }
)

# Monitor progress
print(f"Tuning job started: {tuning_job.resource_name}")
print(f"State: {tuning_job.state}")

# Wait for completion (will take 1-3 hours)
tuning_job.wait_for_completion()
print(f"Tuned model endpoint: {tuning_job.tuned_model_endpoint_name}")
```

### Method 3: Via REST API

```bash
# Get access token
ACCESS_TOKEN=$(gcloud auth print-access-token)
PROJECT_ID="your-project-id"
REGION="us-central1"

# Create tuning job (DO NOT RUN YET)
curl -X POST \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  https://${REGION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${REGION}/tuningJobs \
  -d '{
    "baseModel": "gemini-1.5-flash-002",
    "tunedModelDisplayName": "crownwrite-humanizer-v1",
    "supervisedTuningSpec": {
      "trainingDatasetUri": "gs://crownwrite-training-data/training_data_gemini.jsonl",
      "validationDatasetUri": "gs://crownwrite-training-data/training_data_gemini.jsonl",
      "hyperParameters": {
        "epochCount": 4,
        "learningRateMultiplier": 0.001,
        "adapterSize": "16"
      }
    }
  }'
```

### Recommended Hyperparameters:

```yaml
Base Model: gemini-1.5-flash-002
Epochs: 3-5 (start with 4)
Learning Rate: 0.001
Adapter Size: 16
Validation Split: 10%
Batch Size: Auto (Vertex AI optimizes)
```

### Training Time:
- **Expected:** 1-3 hours for 715 examples
- **Depends on:** Model size, epochs, Google Cloud load

---

## 8️⃣ Receiving Tuned Model Name/ID

### During Training:

When you start the job, you'll receive:
```
Tuning job created: projects/PROJECT_ID/locations/us-central1/tuningJobs/TUNING_JOB_ID
```

### After Training Completes:

You'll receive the **tuned model endpoint**:
```
projects/PROJECT_ID/locations/us-central1/endpoints/ENDPOINT_ID
```

### How to Get Model Info:

**Option A: Check Console**
1. Go to: https://console.cloud.google.com/vertex-ai/generative/language/tuned-models
2. Find: "crownwrite-humanizer-v1"
3. Click to view details
4. Copy: Model endpoint/resource name

**Option B: Via gcloud**
```bash
# List tuning jobs
gcloud ai models tuning list-tuning-jobs \
  --region=us-central1

# Get specific job details
gcloud ai models tuning describe-tuning-job \
  TUNING_JOB_ID \
  --region=us-central1

# List tuned models
gcloud ai endpoints list --region=us-central1
```

**Option C: Via Python**
```python
# After job completes
tuned_model_name = tuning_job.tuned_model_name
tuned_endpoint = tuning_job.tuned_model_endpoint_name

print(f"Tuned Model: {tuned_model_name}")
print(f"Endpoint: {tuned_endpoint}")

# Save to file for later use
with open('tuned_model_info.txt', 'w') as f:
    f.write(f"Model: {tuned_model_name}\n")
    f.write(f"Endpoint: {tuned_endpoint}\n")
```

### Model Name Format:
```
projects/PROJECT_NUMBER/locations/us-central1/models/MODEL_ID
```

or

```
projects/PROJECT_NUMBER/locations/us-central1/endpoints/ENDPOINT_ID
```

### Save This Information:
You'll need the model endpoint to make predictions later.

---

## 9️⃣ Calling the Tuned Model from CrownWrite

### Option A: Via Vertex AI SDK (Recommended)

**Install SDK:**
```bash
pip install google-cloud-aiplatform
```

**In your CrownWrite backend:**

```python
from google.cloud import aiplatform
import os

# Initialize (do once at startup)
aiplatform.init(
    project=os.getenv("GOOGLE_CLOUD_PROJECT_ID"),
    location="us-central1"
)

# Your tuned model endpoint
TUNED_MODEL_ENDPOINT = "projects/PROJECT_ID/locations/us-central1/endpoints/ENDPOINT_ID"

def humanize_text(ai_text: str) -> str:
    """
    Humanize AI-generated text using your tuned Gemini model.
    
    Args:
        ai_text: AI-generated text to humanize
        
    Returns:
        Humanized text
    """
    # Get endpoint
    endpoint = aiplatform.Endpoint(TUNED_MODEL_ENDPOINT)
    
    # Format input (same as training format)
    prompt = f"Humanize this text:\n\n{ai_text}"
    
    # Make prediction
    response = endpoint.predict(
        instances=[{"content": prompt}]
    )
    
    # Extract humanized text
    humanized_text = response.predictions[0]
    
    return humanized_text

# Usage in your API route
@app.post("/api/humanize")
async def humanize_endpoint(request: HumanizeRequest):
    try:
        humanized = humanize_text(request.ai_text)
        return {"humanized_text": humanized}
    except Exception as e:
        return {"error": str(e)}, 500
```

### Option B: Via Generative AI SDK

```python
import google.generativeai as genai

# Configure with your API key
genai.configure(api_key=os.getenv("GOOGLE_AI_API_KEY"))

# Get your tuned model
model = genai.GenerativeModel(
    model_name="tunedModels/crownwrite-humanizer-v1-xxxxx"
)

def humanize_text(ai_text: str) -> str:
    """Humanize text using tuned model"""
    prompt = f"Humanize this text:\n\n{ai_text}"
    
    response = model.generate_content(prompt)
    return response.text

# Usage
humanized = humanize_text("Success is often misunderstood...")
```

### Option C: Via REST API

```python
import requests
import os

def humanize_text_rest(ai_text: str) -> str:
    """Call tuned model via REST API"""
    
    # Get access token
    access_token = os.popen('gcloud auth print-access-token').read().strip()
    
    # Endpoint URL
    endpoint_url = f"https://us-central1-aiplatform.googleapis.com/v1/{TUNED_MODEL_ENDPOINT}:predict"
    
    # Request payload
    payload = {
        "instances": [{
            "content": f"Humanize this text:\n\n{ai_text}"
        }]
    }
    
    # Headers
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    
    # Make request
    response = requests.post(endpoint_url, json=payload, headers=headers)
    response.raise_for_status()
    
    # Extract result
    result = response.json()
    humanized_text = result["predictions"][0]
    
    return humanized_text
```

### Environment Variables to Set:

Add to your `.env` file:
```bash
# Google Cloud Configuration
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
TUNED_MODEL_ENDPOINT=projects/PROJECT_ID/locations/us-central1/endpoints/ENDPOINT_ID

# Or use API Key (for Generative AI SDK)
GOOGLE_AI_API_KEY=your-api-key
TUNED_MODEL_NAME=tunedModels/crownwrite-humanizer-v1-xxxxx
```

### Integration with Your Existing Route:

Update `/Users/mac/Desktop/true/Crownwrite/app/api/humanize/route.ts`:

```typescript
// app/api/humanize/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Import your Python backend call or use a Node.js SDK
const { GoogleAuth } = require('google-auth-library');
const { aiplatform } = require('@google-cloud/aiplatform');

export async function POST(request: NextRequest) {
  try {
    const { text, tone } = await request.json();
    
    // Call your tuned Gemini model
    const humanizedText = await callTunedGeminiModel(text);
    
    return NextResponse.json({
      humanizedText,
      success: true
    });
  } catch (error) {
    console.error('Humanization error:', error);
    return NextResponse.json(
      { error: 'Humanization failed' },
      { status: 500 }
    );
  }
}

async function callTunedGeminiModel(aiText: string): Promise<string> {
  // Your Gemini model call implementation
  const endpoint = process.env.TUNED_MODEL_ENDPOINT;
  
  // Use Vertex AI client to call endpoint
  // Return humanized text
  
  return humanizedText;
}
```

### Cost per Request:
- **Gemini 1.5 Flash tuned model:** ~$0.01-0.02 per request
- Depends on input/output token count
- Check current pricing: https://cloud.google.com/vertex-ai/generative-ai/pricing

---

## 📋 Complete Setup Checklist

### Pre-Training Setup:
- [ ] Create Google Cloud project
- [ ] Enable billing (or use $300 free credits)
- [ ] Enable required APIs (Vertex AI, Cloud Storage, etc.)
- [ ] Install gcloud CLI
- [ ] Authenticate: `gcloud auth login`
- [ ] Set project: `gcloud config set project PROJECT_ID`
- [ ] Create Cloud Storage bucket in us-central1
- [ ] Upload `training_data_gemini.jsonl` to bucket
- [ ] Verify file is accessible in bucket

### Training:
- [ ] Review hyperparameters
- [ ] Start tuning job (expect 1-3 hours)
- [ ] Monitor job status
- [ ] Wait for completion notification
- [ ] Save tuned model endpoint/name

### Post-Training:
- [ ] Test tuned model with sample inputs
- [ ] Integrate into CrownWrite backend
- [ ] Set up environment variables
- [ ] Deploy updated application
- [ ] Monitor inference costs
- [ ] Implement error handling

---

## 💰 Cost Summary

### One-Time Costs:
- **Fine-tuning:** ~$10-30 (one time)
- **Storage:** ~$0.026/month (ongoing)

### Per-Request Costs:
- **Inference:** ~$0.01-0.02 per humanization request
- Scales with usage

### Free Tier:
- **$300 credits** for new Google Cloud users
- Valid for 90 days
- Can cover initial fine-tuning and testing

---

## 🎯 Recommended Next Steps

1. **Create Google Cloud Account** (if not already)
2. **Enable $300 free credits** (for new users)
3. **Create project and enable APIs**
4. **Create bucket and upload training file**
5. **Review this guide one more time**
6. **When ready:** Run the fine-tuning command
7. **Wait for completion** (1-3 hours)
8. **Integrate tuned model into CrownWrite**
9. **Test and deploy**

---

## 📚 Official Documentation

- Vertex AI Tuning: https://cloud.google.com/vertex-ai/docs/generative-ai/models/tune-models
- Gemini Fine-Tuning: https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini-supervised-tuning
- Pricing: https://cloud.google.com/vertex-ai/generative-ai/pricing
- Python SDK: https://cloud.google.com/python/docs/reference/aiplatform/latest

---

**Everything is prepared. No training started. No charges incurred.**

**When you're ready to proceed, follow this guide step by step.** 🚀
