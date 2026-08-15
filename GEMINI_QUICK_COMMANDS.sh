#!/bin/bash
# ============================================================================
# CrownWrite Gemini Fine-Tuning Quick Commands
# ============================================================================
# DO NOT RUN THIS SCRIPT DIRECTLY
# Use individual commands as needed
# ============================================================================

# ============================================================================
# 1. SETUP VARIABLES (Edit these first)
# ============================================================================
export PROJECT_ID="your-project-id"
export BUCKET_NAME="crownwrite-training-data"
export REGION="us-central1"
export MODEL_DISPLAY_NAME="crownwrite-humanizer-v1"
export LOCAL_TRAINING_FILE="/Users/mac/Desktop/true/Crownwrite/Data/training_data_gemini.jsonl"

# ============================================================================
# 2. INITIAL SETUP
# ============================================================================

# Authenticate with Google Cloud
gcloud auth login

# Set project
gcloud config set project $PROJECT_ID

# Enable required APIs
gcloud services enable aiplatform.googleapis.com
gcloud services enable storage-api.googleapis.com
gcloud services enable generativelanguage.googleapis.com
gcloud services enable cloudresourcemanager.googleapis.com

# ============================================================================
# 3. CREATE CLOUD STORAGE BUCKET
# ============================================================================

# Create bucket (MUST be in us-central1)
gsutil mb -l us-central1 gs://${BUCKET_NAME}

# Verify bucket created
gsutil ls

# ============================================================================
# 4. UPLOAD TRAINING DATA
# ============================================================================

# Upload training file
gsutil cp $LOCAL_TRAINING_FILE gs://${BUCKET_NAME}/training_data_gemini.jsonl

# Verify upload
gsutil ls -lh gs://${BUCKET_NAME}/

# Check file details
gsutil stat gs://${BUCKET_NAME}/training_data_gemini.jsonl

# ============================================================================
# 5. START FINE-TUNING JOB (DO NOT RUN YET - WILL INCUR CHARGES)
# ============================================================================

# Method 1: Using gcloud (Recommended)
gcloud ai models tuning tune \
  --region=$REGION \
  --display-name=$MODEL_DISPLAY_NAME \
  --source-model=gemini-1.5-flash-002 \
  --training-dataset-uri=gs://${BUCKET_NAME}/training_data_gemini.jsonl \
  --validation-dataset-uri=gs://${BUCKET_NAME}/training_data_gemini.jsonl \
  --validation-dataset-split=0.1 \
  --epochs=4 \
  --learning-rate=0.001 \
  --adapter-size=16

# ============================================================================
# 6. MONITOR TRAINING
# ============================================================================

# List all tuning jobs
gcloud ai models tuning list-tuning-jobs --region=$REGION

# Get specific job status (replace TUNING_JOB_ID)
gcloud ai models tuning describe-tuning-job TUNING_JOB_ID --region=$REGION

# Watch logs (if job ID known)
gcloud ai models tuning describe-tuning-job TUNING_JOB_ID \
  --region=$REGION \
  --format="value(state)"

# ============================================================================
# 7. AFTER TRAINING COMPLETES
# ============================================================================

# List tuned models
gcloud ai endpoints list --region=$REGION

# Get endpoint details (replace ENDPOINT_ID)
gcloud ai endpoints describe ENDPOINT_ID --region=$REGION

# ============================================================================
# 8. TEST TUNED MODEL (Replace with your actual endpoint)
# ============================================================================

# Get access token
ACCESS_TOKEN=$(gcloud auth print-access-token)

# Test prediction (replace ENDPOINT_ID)
curl -X POST \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/endpoints/ENDPOINT_ID:predict \
  -d '{
    "instances": [{
      "content": "Humanize this text:\n\nSuccess is often misunderstood as a destination marked by wealth, status, or recognition."
    }]
  }'

# ============================================================================
# 9. CLEANUP (OPTIONAL - Use if you want to delete resources)
# ============================================================================

# Delete bucket (WARNING: This deletes all files)
# gsutil rm -r gs://${BUCKET_NAME}

# Delete endpoint (after getting endpoint ID)
# gcloud ai endpoints delete ENDPOINT_ID --region=$REGION

# ============================================================================
# NOTES:
# - Replace 'your-project-id' with your actual Google Cloud project ID
# - Replace TUNING_JOB_ID and ENDPOINT_ID with actual values after creation
# - Training will take 1-3 hours and cost ~$10-30
# - Do not run this script directly - copy commands as needed
# ============================================================================

echo "This is a reference file - do not execute directly"
echo "Copy individual commands as needed"
