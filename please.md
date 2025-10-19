You will be provided with a list of requirements for a new website.

User Input: a cannabis store you need to log into before you see any of the site. Cannabis Page Merch Page Cart Page - clicking checkout exports cart to whatsapp and ads checkout log to log. when userers 1st reg, admin must approve before they have access to the site.

separate admin area with User mgmt: CRUD; trist icons green, yellow red product mgmt: CRUD, upload pics Finance Dashboard: (Financials, all checkouts, all sales, etc Inventory mgmt

Based on these requirements, generate a full functional specification document. Organize the document into the following main sections, using headings, subheadings, and bullet points for clarity.

1. General System Behavior & User Access

Detail the mandatory login/registration gate that prevents non-logged-in users from viewing any site content.
Describe the new user registration process.
Explain the admin approval workflow: a new user account must be manually approved by an administrator before the user is granted access to the site.
2. Customer-Facing Website

Describe the functionality of the main pages visible to an approved, logged-in user.
Cannabis Page: A product gallery or listing page for all cannabis products.
Merch Page: A product gallery or listing page for all merchandise.
Cart Page: A page that displays items the user has added to their cart, with options to modify quantities or remove items.
Checkout Process: Clearly explain the unique checkout flow:
When a user clicks the "Checkout" button on the Cart Page, the system should generate a summary of the cart's contents.
This summary should be formatted for and exported to WhatsApp (e.g., by opening a new WhatsApp chat with a pre-filled message containing the order details).
Simultaneously, the system must create an entry in a "checkout log" to record the event.
3. Administrative Panel

Describe the secure, separate administrative area for site managers. Create subsections for each management module.
User Management:
Detail the full CRUD (Create, Read, Update, Delete) capabilities for user accounts.
Explain the function of the tri-state status icons. Propose a meaning for each color (e.g., Green: Approved/Active, Yellow: Pending Approval, Red: Banned/Deactivated).
Product Management:
Detail the CRUD operations for products (both cannabis and merch).
Specify that this includes the ability to upload product images.
Finance Dashboard:
Describe the purpose of this dashboard as a central hub for financial oversight.
List the key data points it should display, based on the user's notes: overall financials, a log of all checkouts, and total sales data.
Inventory Management:
Describe the functionality of this module for tracking product stock levels, which is essential for managing what is available for sale on the Cannabis and Merch pages.
Maintain a professional and technical tone throughout the document. Your goal is to translate the user's notes into a formal specification that is clear and actionable for a development team.