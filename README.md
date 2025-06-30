# Requirements Document for Node.js IP Geo Location Access Control

## 1.0 Project Overview
This document outlines the requirements for a Node.js project that uses the ipgeolocation.io API to determine the country of origin for an IP address attempting to access the application and restricts access to only those IPs originating from the United States.

## 2.0 Functional Requirements

### 2.1 IP Geo Location Lookup
- **FR1.1**: The application shall integrate with the ipgeolocation.io API to retrieve geolocation data for a given IP address.
- **FR1.2**: The application shall extract the country code from the API response.
- **FR1.3**: The application shall handle API rate limits and errors gracefully, providing appropriate error messages to the user.

### 2.2 Access Control
- **FR2.1**: The application shall allow access only if the IP address originates from the United States (country code: "US").
- **FR2.2**: If the IP address originates from a country other than the US, the application shall deny access and return a 403 Forbidden status code with a message indicating access is restricted to US users.
- **FR2.3**: The application shall support both IPv4 and IPv6 addresses for geolocation lookups.

### 2.3 Request Handling
- **FR3.1**: The application shall extract the client’s IP address from the HTTP request headers (e.g., `X-Forwarded-For` or `req.ip`).
- **FR3.2**: The application shall handle cases where the IP address is not provided or is invalid, returning a 400 Bad Request status code with an appropriate error message.

## 3.0 Non-Functional Requirements

### 3.1 Performance
- **NFR1.1**: The geolocation lookup and access control check shall complete within 500ms for 95% of requests under normal load conditions.
- **NFR1.2**: The application shall cache geolocation results for frequently accessed IPs to reduce API calls and improve response time, with a configurable cache TTL (default: 24 hours).

### 3.2 Security
- **NFR2.1**: The application shall securely store the ipgeolocation.io API key in environment variables, not in source code.
- **NFR2.2**: The application shall validate and sanitize all incoming IP addresses to prevent injection attacks.
- **NFR2.3**: The application shall use HTTPS to encrypt all communications between the client and server.

### 3.3 Scalability
- **NFR3.1**: The application shall support up to 1,000 concurrent requests per second without degradation in performance.
- **NFR3.2**: The application shall be designed to allow horizontal scaling by adding more Node.js instances behind a load balancer.

### 3.4 Reliability
- **NFR4.1**: The application shall achieve 99.9% uptime, excluding scheduled maintenance.
- **NFR4.2**: The application shall log all access attempts (allowed and denied) with timestamps, IP addresses, and country codes for auditing purposes.

## 4.0 Technical Requirements

### 4.1 Platform
- **TR1.1**: The application shall be built using Node.js (version 18.x or higher).
- **TR1.2**: The application shall use Express.js as the web framework for handling HTTP requests.

### 4.2 Dependencies
- **TR2.1**: The application shall use the `axios` or `node-fetch` library for making HTTP requests to the ipgeolocation.io API.
- **TR2.2**: The application shall use a caching library (e.g., `node-cache` or Redis) for storing geolocation results.
- **TR2.3**: The application shall use the `winston` or similar library for logging access attempts and errors.
- **TR2.4**: The application shall use the `dotenv` library to manage environment variables, including the API key.

### 4.3 API Integration
- **TR3.1**: The application shall use the ipgeolocation.io API endpoint for IP geolocation (`https://api.ipgeolocation.io/ipgeo`).
- **TR3.2**: The application shall include the API key in all requests to the ipgeolocation.io API as a query parameter (`apiKey`).
- **TR3.3**: The application shall handle API response fields including `ip`, `country_code2`, and `country_name` for access control decisions.

### 4.4 Deployment
- **TR4.1**: The application shall be deployable on a cloud platform (e.g., AWS, Heroku, or Vercel) with support for environment variable configuration.
- **TR4.2**: The application shall include a `Dockerfile` for containerized deployment.

## 5.0 Assumptions and Constraints

### 5.1 Assumptions
- **A1**: The ipgeolocation.io API will be available and responsive during application runtime.
- **A2**: The client’s IP address can be reliably extracted from HTTP request headers.
- **A3**: The application will have access to a valid ipgeolocation.io API key with sufficient quota for expected traffic.

### 5.2 Constraints
- **C1**: The application must comply with ipgeolocation.io’s API usage limits (e.g., free tier limits of 1,000 requests/day or paid tier limits).
- **C2**: The application must adhere to data privacy regulations (e.g., GDPR, CCPA) when handling IP addresses and geolocation data.
- **C3**: The application must not store geolocation data beyond the cache TTL unless explicitly required for auditing.

## 6.0 Deliverables
- **D1**: A Node.js application implementing the specified access control logic.
- **D2**: Documentation including setup instructions, environment variable configuration, and API integration details.
- **D3**: Unit and integration tests covering IP lookup, access control, and error handling.
- **D4**: A deployment guide for cloud platforms and Docker.

## 7.0 Acceptance Criteria
- **AC1**: The application correctly allows access for US-based IPs and denies access for non-US IPs in all test cases.
- **AC2**: The application handles invalid IPs, missing headers, and API errors with appropriate status codes and messages.
- **AC3**: The application meets performance requirements under load testing (500ms response time for 95% of requests).
- **AC4**: All security requirements (e.g., secure API key storage, HTTPS) are implemented and verified.
- **AC5**: The application is successfully deployed to a cloud platform and passes end-to-end testing.
