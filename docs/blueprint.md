Firebase Studio Implementation Specification: Zero-Cost Gated E-Commerce Platform
This specification is optimized for the Firebase "Spark" (Free) plan, strictly adhering to the generous usage limits (especially for a site capped at 300 users). The architecture minimizes expensive operations (such as frequent Cloud Function calls, excessive database writes, or large Storage usage) to ensure the system remains zero-cost.

Architecture Principle: Firebase Free Tier Optimization
Service	Free Tier Limit (Key Metrics)	Strategy for 300 Users
Authentication	50,000 MAU	Safe.
Firestore	50k Reads/day, 20k Writes/day	Very safe. Rely on efficient querying and indexing.
Cloud Functions	2 Million Invocations/month	Extremely safe. Used only for required server-side logic (checkout log).
Storage	5 GB Stored	Critical: Must optimize all product images (compression, WebP format) to stay under 5GB.
Hosting	Safe.	Use lightweight, client-side rendering frameworks.
_____________________________________________________________
