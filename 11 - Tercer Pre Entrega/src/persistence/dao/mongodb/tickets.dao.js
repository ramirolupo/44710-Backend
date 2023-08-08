import { ticketModel } from "./models/tickets.model.js";


export default class TicketsDaoMongoDB {
    async createTicket(obj) {
        try {
          const response = await ticketModel.create(obj);
          return response;
        } catch (error) {
          console.log(error);
        }
      }
}