# Logistics & Shipment Tracking

The Shipment Workspace (`/dashboard/orders/:id`) provides granular visibility into post-PO operations.

## Production Timeline
The system visually tracks manufacturing milestones to prevent black-box delays:
- Order Confirmed (PO Signed, Deposit Cleared)
- Raw Material Sourcing (Yarns secured, dyeing)
- Manufacturing (Weaving, knitting)
- Quality Check (Inspections, defect removal)
- Packaging (Export packing, palletizing)
- Shipping (Handed to carrier)
- Delivered (Received at destination)

## Shipping Details
We track vital B2B shipping information:
- Carrier Name (e.g., Maersk, FedEx)
- Tracking Number / AWB
- Container ID
- Port of Origin -> Port of Destination
- Shipping Method (LCL, FCL, Air)
- Expected Arrival (ETA)

## Document Center
Centralized repository for compliance and border-crossing documents:
- Commercial Invoices
- Packing Lists
- Bill of Lading (BL)
- Quality/ISO Certificates
