# UrbanRentisha Backend API Endpoint Map

Base URL:

```text
http://localhost:4000/api/v1
```

## Auth

```text
POST /auth/register
POST /auth/login
GET  /auth/me
```

## Listings

```text
GET   /listings
GET   /listings/:id
POST  /listings
PATCH /listings/:id/verify
```

## Viewing Requests

```text
POST /viewing-requests
GET  /viewing-requests/:id
GET  /viewing-requests/:id/status
```

## Payments

```text
POST /payments/create
POST /payments/confirm
GET  /payments/:id
```

## ZK Proofs

```text
POST /zk-proofs/generate
GET  /zk-proofs/:id
```

## Proof Verification

```text
POST /proof-verification/submit
GET  /proof-verification/:id
```

## Viewing Codes

```text
POST /viewing-codes/generate
GET  /viewing-codes/:code/verify
```

## Reports

```text
POST /reports
GET  /reports
```

## Notifications

```text
GET   /notifications
PATCH /notifications/:id/read
```

## Audit Logs

```text
GET /audit-logs
```

## External API

```text
POST /external/viewing-requests
```

## Webhooks

```text
POST /webhooks
GET  /webhooks
```

## Admin

```text
GET /admin/dashboard
```
