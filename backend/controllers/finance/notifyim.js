const aspSchema = require("../../models/inventory/ApprovedSP");
const orderSchema = require("../../models/inventory/Order");



async function updateOrderStatusOrderSchema(orderId) {
    try {
        const order = await orderSchema.findById(orderId);
        if (order) {
            order.status = "completed";
            await order.save();
            console.log(`Order ${orderId} status updated to "complete"`);
        } else {
            console.error('Order not found');
        }
    } catch (error) {
        console.error('Error updating order status:', error);
    }
}

async function updateOrderStatusAspSchema(orderId) {
    try {
        const order = await aspSchema.findById(orderId);
        if (order) {
            order.status = "ongoing";
            await order.save();
            console.log(`Order ${orderId} status updated to "complete"`);
        } else {
            console.error('Order not found');
        }
    } catch (error) {
        console.error('Error updating order status:', error);
    }
}




const notifyIM=async(req, res)=> {
    const {paymentId} = req.params;

    try {
        if (paymentId.startsWith('PA')) {
            const order = await orderSchema.findOne({ paymentId : paymentId});
            if (order) {
                await updateOrderStatusOrderSchema(order._id);
                res.send('Order status updated to completed');
            } else {
                res.status(404).send('Order not found');
            }
        } else if (paymentId.startsWith('PB')) {
            const aspOrder = await aspSchema.findOne({ paymentId : paymentId });
            if (aspOrder) {
                const orderId = aspOrder._id;
                await updateOrderStatusAspSchema(orderId);
                res.send('Order status updated to ongoing');
            } else {
                res.status(404).send('Order not found');
            }
        } else {
            res.status(400).send('Invalid payment ID');
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).send('Internal Server Error');
    }
}

const updateProductPaymentIdByOrderId=async(req, res) =>{
    const {orderId}=req.params;
    const { paymentId } = req.body;

    try {
        // Find the record by orderId
        const record = await orderSchema.findOne({ orderId:orderId });

        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        // Update paymentId
        record.paymentId = paymentId;
        await record.save();
        console.log("payment Id added successfully")
        res.status(200).json({ message: 'PaymentId updated successfully' });
    } catch (error) {
        console.log("payment Id adding failed")
        console.error('Error updating paymentId:', error);
        res.status(500).json({ message: 'Internal Server Error' });

    }
}




const updateSPPaymentIdByOrderId=async(req, res) =>{
    const {orderId}=req.params;
    const { paymentId } = req.body;

    try {
        // Find the record by orderId
        const record = await aspSchema.findOne({ orderId:orderId });

        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        // Update paymentId
        record.paymentId = paymentId;
        await record.save();
        console.log("payment Id added successfully")

        res.status(200).json({ message: 'PaymentId updated successfully' });
    } catch (error) {
        console.error('Error updating paymentId:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}








module.exports = { notifyIM,updateProductPaymentIdByOrderId,updateSPPaymentIdByOrderId };