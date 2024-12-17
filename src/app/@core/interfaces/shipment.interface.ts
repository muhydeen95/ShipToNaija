export interface Shipment {
    id: number, 
    shipmentId: string, 
    trackingNo: string, 
    trackingId: string, 
    courier: string,  
    category: string, 
    date: string, 
    destination: string, 
    weight: number, 
    cost: number, 
    status: string, 
    approvalStatus: string 
    paymentStatus: string,
    courierIcon?: string,
    destinationIcon?: string, 
}