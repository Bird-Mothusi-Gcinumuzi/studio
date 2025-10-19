Functional Specification Document: Secure Cannabis E-Commerce System
1. General System Behavior & User Access
This section defines the mandatory security and access controls designed to ensure regulatory compliance and secure site operation.

1.1 Mandatory Access Gate
The system employs a strict, mandatory login gate that prevents unauthorized users from viewing any content on the site, including product pages, marketing materials, or company information (excluding publicly required legal documents like Terms of Service and Privacy Policy).

Non-Logged-In View: Users accessing the root domain will be immediately redirected to the Login/Registration page. They will only see:
Login form.
Registration link.
Site branding.
1.2 New User Registration Process
New users must complete a standard registration process to initiate account creation.

Data Capture: Minimum required fields: Full Name, Email Address, Password, and Confirmation of Age/Legal Status (e.g., checkbox affirming 19+ or 21+, depending on jurisdiction).
Initial Status: Upon successful registration, the user's account status is immediately set to "Pending Approval."
Notification: The user receives an automated email confirming registration and informing them that their account requires administrative review before access is granted. Simultaneously, administrators are notified of a new account awaiting approval.
1.3 Administrator Approval Workflow
Access to the customer-facing website is conditional upon explicit administrator approval.

Default State: All new accounts begin in the "Pending Approval" state.
Login Barrier: If a user attempts to log in while their status is "Pending Approval" or "Deactivated," the login attempt will fail, and the system will display a clear message indicating that the account is under review or requires reactivation.
Approval Action: An administrator must use the User Management module (Section 3.1) to review the new user and manually change the account status from "Pending Approval" (Yellow Tri-State Icon) to "Approved/Active" (Green Tri-State Icon).
Access Granted: Once approved, the user gains full access to the Customer-Facing Website (Section 2).
2. Customer-Facing Website
This section details the functionality available to an approved, logged-in user.

2.1 Navigation Structure
Approved users will have access to the following primary navigation links:

Cannabis Page
Merch Page
Cart Page
My Account / Profile
2.2 Cannabis Page
This is the primary product gallery for regulated cannabis items.

Product Listing: Displays a gallery view or listing of all available cannabis products, sourcing data directly from the Product and Inventory Management systems.
Required Data: For each product, the page must display: Product Image, Name, Strain/Type, Potency/Format details, Price, and a prominent "Add to Cart" button.
Filtering/Sorting: Standard filtering options based on Category (e.g., Flower, Edibles, Vapes), Strain Type (e.g., Indica, Sativa), and Price range.
2.3 Merch Page
This page functions as a standard e-commerce gallery for non-regulated merchandise.

Product Listing: Displays available apparel, accessories, and other merchandise.
Data Requirements: Product Image, Name, Description, Available Sizes/Variants (if applicable), Price, and "Add to Cart" button.
2.4 Cart Page
The Cart Page allows users to review and manage their selected items before proceeding to checkout initiation.

Display: Lists all items currently added to the cart, displaying: Product Image, Name, Quantity, Unit Price, and Subtotal per item.
Management: Users must be able to modify item quantities (increment/decrement) and remove items entirely.
Calculation: The page must dynamically calculate and display the grand total (excluding taxes and delivery fees, which are assumed to be finalized during the WhatsApp communication).
Action Button: A single, prominent button labeled "Initiate Checkout" or "Checkout."
2.5 Unique Checkout Process
The system employs a non-traditional checkout flow that exports the order details to an external communication platform (WhatsApp) and simultaneously logs the intent to purchase.

A. Order Summary Generation and Export
Action: When the user clicks the "Checkout" button, the system first freezes the current cart contents.
Summary Generation: The system generates a structured text summary containing the necessary order information, including:
Date and Time of Checkout Initiation.
Unique System-Generated Order/Checkout ID.
Customer Name and Contact Details (pulled from user profile).
Detailed Itemized List (Product Name, SKU, Quantity, Unit Price).
Total Cart Value.
WhatsApp Export: The system utilizes the WhatsApp API or a structured URL to open a new chat window on the user's device (desktop or mobile) with the designated sales/fulfillment phone number. The generated Order Summary (Step 2) is pre-filled as the message body.
User Action Required: The user must manually click "Send" within WhatsApp to transmit the order inquiry to the sales team.
B. Checkout Log Creation
Simultaneous Logging: Immediately upon the user clicking the "Checkout" button (Step 1, regardless of whether the user ultimately sends the WhatsApp message), the system must create a permanent record in the database designated as the "Checkout Log."
Log Data: This entry must capture: Checkout ID, User ID, Timestamp of Initiation, and the full contents of the cart at the time of export.
Purpose: This log tracks customer purchase intent and provides data for the Finance Dashboard, distinguishing between browsing and active inquiry.
3. Administrative Panel
The Administrative Panel is a secure, role-restricted area accessible only to system administrators and designated staff.

3.1 User Management Module
This module provides comprehensive control over all registered user accounts.

CRUD Operations:
Create: Ability to manually register new users.
Read: Full list view of all users, searchable by Name, Email, and Status. Detailed view of individual user profiles.
Update: Ability to modify user data (Name, Email, Password reset, etc.).
Delete: Ability to permanently remove a user account from the system (with confirmation prompt).
Tri-State Status Icons: Each user account must clearly display a colored icon indicating their current access status.
🟢 Green (Approved/Active): User has full access to the customer-facing website.
🟡 Yellow (Pending Approval): User has completed registration but is awaiting administrative review. Access is blocked.
🔴 Red (Banned/Deactivated): User access has been manually revoked or deactivated. Access is blocked.
3.2 Product Management Module
This central hub manages the entire inventory list for both cannabis and merchandise.

CRUD Operations:
Create: Define new product entries, including classification (Cannabis vs. Merch).
Read/List: Comprehensive product catalog view.
Update: Modify existing product details (e.g., description, price, category).
Delete: Remove products from the catalog (system should prompt to verify associated inventory clearance).
Image Upload Functionality: Must allow administrators to upload, crop, and assign multiple high-resolution images to each product entry. The first uploaded image is designated as the primary display image.
Data Fields (Mandatory): Product Name, SKU, Category (Cannabis/Merch), Description, Unit Price, and required Inventory linkage.
3.3 Inventory Management Module
This module is essential for tracking real-time stock levels, linking directly to the product availability shown on the Cannabis and Merch pages.

Stock Tracking: Ability to view current stock quantities for all SKUs.
Updates: Functionality to manually adjust stock levels (e.g., adding received shipments, subtracting damaged goods).
Alerts: System must provide configurable alerts for low stock levels (e.g., notify admin when stock for a product falls below 5 units).
3.4 Finance Dashboard
The Finance Dashboard provides high-level and detailed metrics on sales activity and customer purchase intent.

Key Displays & Metrics:
Overall Financials Summary: High-level display of total revenue, average order value (based on confirmed sales), and gross profit (if cost of goods sold data is entered).
All Sales Records: A comprehensive log of orders marked as "Confirmed Sale" (this status is updated manually or via a fulfillment workflow after the WhatsApp inquiry leads to a completed transaction). Data fields include Sale ID, Customer, Date of Sale, Total Value, and Status.
All Checkouts Log: A critical component displaying every instance of a user clicking the "Checkout" button and initiating the WhatsApp export (as defined in Section 2.5 B). This log is crucial for tracking pipeline activity.
Data: Checkout ID, User ID, Cart Total Value (at time of export), Time Stamp, and associated Order Status (e.g., "Pending Follow-up," "Converted to Sale," "Abandoned").
Sales Trends: Basic reporting views (e.g., sales per month, top-selling products).