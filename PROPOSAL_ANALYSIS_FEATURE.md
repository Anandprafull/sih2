# Proposal Analysis Feature

## Overview
This feature provides comprehensive AI-powered analysis of business proposals with a focus on the Indian business context.

## Key Features

### Tab 1: Summary & Q&A
- **Left Column: Document At-a-Glance**
  - Key Information Card with project details, budget, and stakeholders
  - Executive Summary with AI-generated insights
  - Collapsible Scope of Work (SOW) outline showing deliverables, milestones, and out-of-scope items

- **Right Column: Interactive Q&A**
  - Chat interface for natural language questions
  - Source-linked answers with document references
  - India-specific suggested questions (GST, TDS, payment schedule, etc.)

### Tab 2: Deep Analysis
Specialized analysis cards tailored for Indian business environment:

1. **Financial & Compliance Analysis Card**
   - Budget verification with GST calculations
   - Taxation compliance check (GST & TDS)
   - Visual cost breakdown with pie chart

2. **Risk Analysis (India Context)**
   - Risk matrix with likelihood and impact assessment
   - India-specific risks (monsoon delays, regulatory changes, etc.)
   - AI-suggested mitigation strategies

3. **Market & Feasibility Analysis**
   - Target market analysis (Tier-1/Tier-2 cities, demographics)
   - Competitive landscape assessment
   - Alignment with government initiatives (Make in India, Digital India, etc.)

4. **SWOT Analysis**
   - Comprehensive 2x2 grid analysis
   - Tailored for Indian market context
   - Color-coded categories

5. **Actionable Recommendations & Red Flags**
   - Critical issues requiring immediate attention
   - Key discussion points for stakeholders
   - Compliance gaps and risks

## How to Use

1. **Upload PDF**: Click "Upload a DPR" button on the homepage
2. **Select File**: Choose a PDF proposal document
3. **Automatic Redirect**: After upload, you'll be redirected to the analysis page
4. **Explore Analysis**: Navigate between Summary & Deep Analysis tabs

## Technical Details

- **Route**: `/analysis`
- **Component**: `src/pages/ProposalAnalysis.tsx`
- **Upload Handler**: Integrated in `src/components/Hero.tsx`

## India-Specific Features

- ₹ Currency formatting (Lakhs/Crores)
- GST compliance checking (CGST + SGST/IGST)
- TDS provisions analysis
- Government scheme alignment badges
- Regional risk identification
- Multi-lingual support considerations

## Future Enhancements

- Real AI integration for document parsing
- PDF text extraction and analysis
- Export analysis reports
- Share functionality
- Historical analysis tracking
- Comparison between multiple proposals
