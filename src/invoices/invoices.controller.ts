import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {

    constructor(private readonly invoicesServices: InvoicesService) {

    }

    @Get("all/:id")
    public async findAll(@Param('id') id) {
        const invoices = await this.invoicesServices.findAll(id)
        return {"response": invoices}
    }
    @Get("one/:userId/:id")
    public async findById(@Param("id") id, @Param('userId') userId) {
        const invoice = await this.invoicesServices.findById(id, userId)
        return {"response": invoice}
    }

    @Post("insert")
    public async insertInvoice(@Body() invoices) {
        const adding = await this.invoicesServices.insertInvoice(invoices)
        return {"response": adding}
    }

    @Put("update/:userId/:id")
    public async updateInvoice(@Body() invoice, @Param('id') id, @Param('userId') userId) {
        const updatedInvoice = await this.invoicesServices.updateInvoice(invoice, id, userId)
        return {"response": updatedInvoice}
    }
    @Delete("delete/:userId/:id")
    public async deleteInvoice(@Param('userId') userId, @Param('id') id) {
        const deletedInvoice = await this.invoicesServices.deleteInvoice(id, userId)
        return {"response": deletedInvoice}
    }
}
