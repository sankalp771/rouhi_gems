import { Router } from "express";
import { createOrder } from "./service";
import { validateCreateOrderRequest } from "./validation";

export const ordersRouter = Router();

ordersRouter.post("/", async (request, response, next) => {
  try {
    const input = validateCreateOrderRequest(request.body);
    const result = await createOrder(input);

    response.status(201).json({
      orderId: result.order.id,
      status: result.order.status,
      totalPrice: result.order.total_price,
      notifications: result.notifications
    });
  } catch (error) {
    next(error);
  }
});
