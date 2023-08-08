import { TicketModel } from "./models/tickets.model.js";


export default class TicketsDaoMongoDB {
    async createTicket(obj) {
        try {
          const response = await TicketModel.create(obj);
          return response;
        } catch (error) {
          console.log(error);
        }
      }
}