# Hive API Specification

## Overview
The Hive API provides endpoints for mission management, user interactions, and blockchain integration through the Argos API. This document outlines the available endpoints, their parameters, and expected responses.

## Base URL
- Development: `http://localhost:4000`
- Production: `https://api.argos.example.com`

## Authentication
All endpoints require authentication using Firebase Auth tokens and wallet signatures.

```typescript
headers: {
  'Authorization': 'Bearer ${firebaseToken}',
  'X-Wallet-Signature': '${walletSignature}'
}
```

## Endpoints

### Mission Management

#### Create Mission
```http
POST /api/missions
```

**Request Body:**
```typescript
{
  title: string;
  description: string;
  requirements: {
    fingerprints: string[];
    stakeAmount?: number;    // Project89 tokens
    timeLimit?: number;      // In seconds
  };
  rewards: {
    tokenAmount: number;     // Project89 tokens
    experience: number;
  };
  burnAmount?: number;       // Project89 tokens
  expiryDate: string;       // ISO date string
}
```

**Response:**
```typescript
{
  id: string;
  escrowAddress: string;    // Project89 token escrow address
  status: 'active';
  createdAt: string;
}
```

#### List Missions
```http
GET /api/missions
```

**Query Parameters:**
```typescript
{
  status?: 'active' | 'completed' | 'expired';
  page?: number;
  limit?: number;
  sort?: 'newest' | 'reward' | 'expiry';
}
```

#### Get Mission Details
```http
GET /api/missions/:id
```

**Response:**
```typescript
{
  id: string;
  title: string;
  description: string;
  requirements: {
    fingerprints: string[];
    stakeAmount?: number;
    timeLimit?: number;
  };
  rewards: {
    tokenAmount: number;
    experience: number;
  };
  status: 'active' | 'completed' | 'expired';
  participants: {
    [userId: string]: {
      status: string;
      progress: {
        fingerprintsMatched: string[];
        lastUpdate: string;
      };
    };
  };
}
```

### Mission Submissions

#### Submit Mission Proof
```http
POST /api/missions/:id/submissions
```

**Request Body:**
```typescript
{
  userId: string;
  proof: string;
  fingerprintMatches: string[];
}
```

#### List Mission Submissions
```http
GET /api/missions/:id/submissions
```

**Query Parameters:**
```typescript
{
  status?: 'pending' | 'approved' | 'rejected';
  page?: number;
  limit?: number;
}
```

### User Progress

#### Get User Missions
```http
GET /api/users/:userId/missions
```

**Query Parameters:**
```typescript
{
  status?: 'completed' | 'in-progress' | 'failed';
}
```

#### Get User Stats
```http
GET /api/users/:userId/stats
```

**Response:**
```typescript
{
  completed: number;
  attempted: number;
  success_rate: number;
  total_rewards: number;     // In Project89 tokens
  experience: number;
}
```

### Fingerprint Tracking

#### Register Fingerprints
```http
POST /api/fingerprints
```

**Request Body:**
```typescript
{
  fingerprints: string[];
  missionId: string;
  metadata?: Record<string, any>;
}
```

#### Check Fingerprint Matches
```http
GET /api/fingerprints/:id/matches
```

**Query Parameters:**
```typescript
{
  userId: string;
  timeframe?: number;       // In seconds
}
```

### Webhooks

#### Mission Complete Webhook
```http
POST /api/webhooks/mission-complete
```

**Request Body:**
```typescript
{
  missionId: string;
  userId: string;
  completionTime: string;
  rewards: {
    tokenAmount: number;
    experience: number;
  };
}
```

#### Fingerprint Match Webhook
```http
POST /api/webhooks/fingerprint-match
```

**Request Body:**
```typescript
{
  fingerprintId: string;
  userId: string;
  matchTime: string;
  metadata?: Record<string, any>;
}
```

## Error Handling

All endpoints follow the same error response format:

```typescript
{
  error: {
    code: string;
    message: string;
    details?: any;
  }
}
```

Common error codes:
- `AUTH_REQUIRED`: Authentication required
- `INVALID_SIGNATURE`: Invalid wallet signature
- `INSUFFICIENT_BALANCE`: Insufficient Project89 token balance
- `MISSION_NOT_FOUND`: Mission not found
- `INVALID_STATE`: Invalid mission state for operation
- `RATE_LIMITED`: Too many requests 